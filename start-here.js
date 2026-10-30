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

const encounterStage = document.querySelector("#castle-encounter");
const encounterInteractive = document.querySelector("#encounter-interactive");
const encounterFallback = document.querySelector("#encounter-fallback");
const choiceButtons = document.querySelectorAll(".encounter-choice");
const response = document.querySelector("#encounter-response");
const responseTitle = document.querySelector("#encounter-response-title");
const responseStory = document.querySelector("#encounter-response-story");
const responseLesson = document.querySelector("#encounter-response-lesson");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let responseAnimation;

function keepResponseVisible() {
  const position = response.getBoundingClientRect();

  // Scroll only when needed, without moving focus or adding scrolling motion.
  if (position.top < 0 || position.bottom > window.innerHeight) {
    response.scrollIntoView({ block: "nearest", behavior: "instant" });
  }
}

function showOutcome(chosenButton) {
  // Repeating an action keeps its response, but still brings it into view.
  if (chosenButton.getAttribute("aria-pressed") === "true") {
    keepResponseVisible();
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

  keepResponseVisible();
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => showOutcome(button));
});

// If this script cannot load, the static explanation remains and no inert buttons appear.
encounterFallback.hidden = true;
encounterInteractive.hidden = false;
encounterStage.classList.add("is-interactive");
