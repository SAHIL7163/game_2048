# Game 2048 

A React-based implementation of the 2048 game (GUI only). Combine tiles with the same number to reach 2048. This README explains installation, running, gameplay, implementation details, and deliverables.

## Table of Contents
- Installation
- Run (development & production)
- Gameplay (rules & controls)
- Implementation details
- Project structure & where to look
- Deliverables

## Installation

Open a terminal in the project root (Windows PowerShell or CMD):

1. Install dependencies
```powershell
npm install
```

2. Start the development server
```powershell
npm start
```


## Run

- After `npm start` the app usually opens at http://localhost:3000.
- If it doesn't open automatically, open that URL in your browser.

## Gameplay (Rules & Controls)

Goal
- Combine tiles to get the highest tile possible (target: 2048).

Start
- Click "New Game" and pick a board size (default 4x4).
- Two tiles (2 or 4) are placed randomly at start.

Move tiles
- Use arrow keys (↑ ↓ ← →) or on-screen controls (tap/swipe) to move tiles.
- Tiles slide until they hit another tile or the edge.

Merge tiles
- Tiles with the same number that collide during a move merge into one tile with their sum.
- Example: 2 + 2 = 4, 8 + 8 = 16.
- Each tile may merge at most once per move.

New tiles & scoring
- After each valid move a new tile (2 or 4) spawns at a random empty spot.
- Score increases by the value of merged tiles.

Game over / Win
- You win if you create a 2048 tile.
- Game ends (loss) when no moves are possible (no empty cells and no adjacent equal tiles).
- The UI displays current score and highest tile.

Pause & Restart
- Pause the game from the pause control and resume later.
- Use "New Game" or "Restart" to begin again (board size configurable).

Tip
- Try to build larger tiles in one corner to make merges easier.

## Implementation details

- Framework: React (JavaScript). Functional components + hooks.
- Functional programming approach:
  - Core game logic implemented as pure, side-effect-free functions in [src/utils/logic.js](src/utils/logic.js).
  - State updates use immutable patterns (arrays/objects are not mutated in place; new objects/arrays are returned).
  - UI is driven from state only; rendering is a pure function of state.
- Key features implemented:
  - Configurable board size (Y × Y), default 4 × 4.
  - Random spawn of 2 or 4 tiles after each valid move.
  - Merge rules with single-merge-per-move enforcement.
  - Score tracking (sum of merged tile values).
  - Pause and restart from the GUI.
- Where core logic lives:
  - [src/utils/logic.js](src/utils/logic.js) — pure functions: slide/merge lines, apply moves, spawn tiles, check for win/lose.
- UI structure:
  - [src/App.js](src/App.js) — main state management and wiring.
  - [src/component/Board.js](src/component/Board.js) — renders board, receives input, forwards move actions.
  - [src/component/Tile.js](src/component/Tile.js) — renders a single tile.
  - [src/component/SizePopup.js](src/component/SizePopup.js) — board size selector.
  - [src/component/PausePopup.js](src/component/PausePopup.js) — pause UI.
- Styling:
  - Component styles are colocated in [src/component/*.css](src/component/).
  - Global styles: [src/index.css](src/index.css), [src/App.css](src/App.css).

---

## Project files (where to look)

- App entry:
  - [src/index.js](src/index.js)
  - [src/App.js](src/App.js)
- Components:
  - [src/component/Board.js](src/component/Board.js)
  - [src/component/Tile.js](src/component/Tile.js)
  - [src/component/SizePopup.js](src/component/SizePopup.js)
  - [src/component/PausePopup.js](src/component/PausePopup.js)
- Styles:
  - [src/App.css](src/App.css), [src/index.css](src/index.css)
  - Component CSS files under [src/component/](src/component/)
- Game logic:
  - [src/utils/logic.js](src/utils/logic.js)
- Project root:
  - package.json — scripts and dependencies

Open these files in your editor to inspect or modify behavior.

---
