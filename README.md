# D&D Basics

A beginner-friendly Dungeons & Dragons website designed to make tabletop roleplaying easier to understand and explore.

[**Visit the live website**](https://gillatr0n.github.io/basics-web/)

## About the project

D&D Basics started as a hands-on HTML, CSS, and JavaScript project and is gradually evolving into an interactive resource for tabletop roleplaying.

The goal is to make getting started with D&D approachable without overwhelming new players with rules or unfamiliar terminology.

The website combines straightforward explanations, visual examples, and interactive elements to help visitors understand how the game works.

## Current features

- **Beginner guide** — Five chapters introducing D&D, character roles, dice, and the basics of playing.
- **Interactive encounter** — A castle scenario demonstrating possible responses to player choices.
- **D20 ability check** — An interactive dice example with adjustable modifiers, Difficulty Class (DC), and success/failure feedback.
- **Responsive design** — Layouts adapted for desktop, tablet, and mobile screens.
- **Accessibility** — Semantic HTML, keyboard-friendly controls, visible focus states, and reduced-motion support.

## Built with

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages

The project uses no frontend frameworks or external JavaScript libraries.

## Running locally

Clone the repository:

```bash
git clone https://github.com/gillatr0n/basics-web.git
cd basics-web
```

Open `index.html` in a browser. Alternatively, if Python 3 is installed, run a local server from the repository root:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Then visit [http://localhost:8000/](http://localhost:8000/).

No project dependencies or build process are required.

## Project structure

```text
basics-web/
├── README.md            # Project overview and local setup
├── index.html           # Homepage
├── start-here.html      # Beginner guide
├── start-here.js        # Interactive learning features
├── style.css            # Shared and page styles
├── images/              # Website artwork and icons
└── docs/
    └── foundation.md    # Development conventions
```

## Future development

D&D Basics is an ongoing project. Planned areas include:

- A standalone digital dice roller and tabletop tools.
- Additional learning guides and rules references.
- Premade characters and downloadable character sheets.
- Guided character creation.
- Adventure discovery and original one-shots.

These features are planned and are not part of the current release.

## Project notice

D&D Basics is an independent, unofficial project and is not affiliated with or endorsed by Wizards of the Coast.

Fantasy artwork, including the imagined tabletop scene, is AI-generated, as disclosed on the site.
