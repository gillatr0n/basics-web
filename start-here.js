const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Keep a result readable without moving focus or adding scrolling motion.
function keepResultVisible(resultElement) {
  const position = resultElement.getBoundingClientRect();
  const focusedControl = document.activeElement;
  if (focusedControl.matches("button, input")) {
    const controlPosition = focusedControl.getBoundingClientRect();
    // On a short screen, keep the control visible if the full result cannot fit beside it.
    if (controlPosition.top < position.top && position.bottom - controlPosition.top > window.innerHeight) {
      focusedControl.scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }
  }
  if (position.top < 0 || position.bottom > window.innerHeight) {
    resultElement.scrollIntoView({ block: "nearest", behavior: "instant" });
  }
}

function initializeCastleEncounter() {
  const encounterStage = document.querySelector("#castle-encounter");
  if (!encounterStage) return;

  // Each choice has one illustrative response, not a universal D&D outcome.
  const encounterOutcomes = {
    knock: {
      title: "A voice answers.",
      story: "Your knock echoes through the hall. A cautious voice calls, “Who's there?” You have a chance to explain why your group has come.",
      lesson: "A simple action can start a conversation. You decide what to say next."
    },
    search: {
      title: "A clue in the ivy.",
      story: "You follow the wall and notice a narrow gap behind the ivy. A cool draft slips through. Where might it lead?",
      lesson: "Exploration creates new questions. Investigating an uncertain clue might call for rules or a dice roll."
    },
    plan: {
      title: "An idea from a friend.",
      story: "A companion points to the tower: “What if I watch that window while you knock?” You can combine ideas before anyone acts.",
      lesson: "D&D is collaborative. Players can share information, build on suggestions, and decide on an approach together."
    }
  };

  const encounterInteractive = document.querySelector("#encounter-interactive");
  const encounterFallback = document.querySelector("#encounter-fallback");
  const choiceButtons = document.querySelectorAll(".encounter-choice");
  const response = document.querySelector("#encounter-response");
  const responseTitle = document.querySelector("#encounter-response-title");
  const responseStory = document.querySelector("#encounter-response-story");
  const responseLesson = document.querySelector("#encounter-response-lesson");
  let responseAnimation;

  function showOutcome(chosenButton) {
    // Repeating an action keeps its response, but still brings it into view.
    if (chosenButton.getAttribute("aria-pressed") === "true") {
      keepResultVisible(response);
      return;
    }

    const outcome = encounterOutcomes[chosenButton.dataset.choice];
    responseTitle.textContent = outcome.title;
    responseStory.textContent = outcome.story;
    responseLesson.textContent = outcome.lesson;

    choiceButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button === chosenButton));
    });

    // Cancel an earlier fade if someone switches choices quickly.
    if (responseAnimation) responseAnimation.cancel();
    if (!reducedMotion.matches) {
      responseAnimation = response.animate(
        [{ opacity: 0.65 }, { opacity: 1 }],
        { duration: 160, easing: "ease-out" }
      );
    }

    keepResultVisible(response);
  }

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => showOutcome(button));
  });

  // If this script cannot load, the static explanation remains and no inert buttons appear.
  encounterFallback.hidden = true;
  encounterInteractive.hidden = false;
  encounterStage.classList.add("is-interactive");
}

function initializeDice() {
  const diceExplorer = document.querySelector("#dice-explorer");
  if (!diceExplorer) return;

  const diceFallback = document.querySelector("#dice-fallback");
  const rollButton = diceExplorer.querySelector("#roll-d20");
  const modifierInput = diceExplorer.querySelector("#dice-modifier");
  const modifierDisplay = diceExplorer.querySelector("#dice-modifier-value");
  const dieValue = diceExplorer.querySelector("#digital-die-value");
  const dieArt = diceExplorer.querySelector("#digital-die-art");
  const dieFace = diceExplorer.querySelector("#digital-die-face");
  const feedback = diceExplorer.querySelector("#dice-feedback");
  const rollLabel = diceExplorer.querySelector("#dice-roll-label");
  const calculation = diceExplorer.querySelector("#dice-calculation");
  const outcomeTitle = diceExplorer.querySelector("#dice-outcome-title");
  const outcomeStory = diceExplorer.querySelector("#dice-outcome-story");
  const naturalNote = diceExplorer.querySelector("#dice-natural-note");

  const difficultyClass = 15;
  let lastDieResult = null;
  let attemptCount = 0;
  let dieAnimation;

  function updateNaturalRoll() {
    // Recognition uses the unmodified die. It never changes success or failure.
    naturalNote.hidden = false;
    if (lastDieResult === 20) {
      dieFace.dataset.natural = "20";
      naturalNote.textContent = "Natural 20! Critical hits concern attack rolls. This ability check still uses the total.";
    } else if (lastDieResult === 1) {
      dieFace.dataset.natural = "1";
      naturalNote.textContent = "Natural 1. Attack rolls automatically miss; ordinary ability checks still use the total.";
    } else {
      dieFace.removeAttribute("data-natural");
      naturalNote.textContent = "";
      naturalNote.hidden = true;
    }
  }

  function updateCheck() {
    // A range input supplies text; Number converts it before we add.
    const modifier = Number(modifierInput.value);
    let modifierSign = "+";
    let spokenSign = "plus";
    if (modifier < 0) {
      modifierSign = "−";
      spokenSign = "minus";
    }

    modifierDisplay.textContent = modifierSign + Math.abs(modifier);
    modifierInput.setAttribute("aria-valuetext", spokenSign + " " + Math.abs(modifier));

    // Moving the slider before the first roll must not invent a die result.
    if (lastDieResult === null) return;

    const total = lastDieResult + modifier;
    const succeeded = total >= difficultyClass;
    dieValue.textContent = lastDieResult;
    calculation.textContent = lastDieResult + " " + modifierSign + " " + Math.abs(modifier) + " = " + total;
    updateNaturalRoll();

    // The count also makes a repeated identical roll a new live announcement.
    if (succeeded) {
      rollLabel.textContent = "Attempt " + attemptCount + " / Success";
      outcomeTitle.textContent = "You find a way inside.";
      outcomeStory.textContent = "Your total meets or beats DC " + difficultyClass + ". Behind the ivy, you spot a narrow entrance and call your friends over.";
      feedback.dataset.outcome = "success";
    } else {
      rollLabel.textContent = "Attempt " + attemptCount + " / Failure";
      outcomeTitle.textContent = "The wall keeps its secret.";
      outcomeStory.textContent = "Your total is below DC " + difficultyClass + ". You don't find an entrance this time. You could ask a companion for an idea or try another approach.";
      feedback.dataset.outcome = "failure";
    }
  }

  function rollDice() {
    // Math.random gives 0 up to (but not including) 1.
    // Multiplying by 20, rounding down and adding 1 produces integers 1–20.
    lastDieResult = Math.floor(Math.random() * 20) + 1;
    attemptCount += 1;
    updateCheck();

    // Animate only the die artwork: the number and outcome stay readable.
    if (dieAnimation) dieAnimation.cancel();
    if (!reducedMotion.matches) {
      dieAnimation = dieArt.animate(
        [
          { transform: "rotate(-18deg) scale(0.94)" },
          { transform: "rotate(12deg) scale(1.04)", offset: 0.55 },
          { transform: "rotate(0deg) scale(1)" }
        ],
        { duration: 360, easing: "ease-out" }
      );
    }

    keepResultVisible(feedback);
  }

  rollButton.addEventListener("click", rollDice);
  modifierInput.addEventListener("input", updateCheck);
  diceFallback.hidden = true;
  diceExplorer.hidden = false;
}

initializeCastleEncounter();
initializeDice();
