const CONTAINER_SIZE = 700;
const INITIAL_SIZE = 16;
const SQUARE_BORDER = "1px solid black";

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function isNumericString(str: string) {
  const trimmed = str.trim();
  if (trimmed === "") return false;

  return Number.isFinite(Number(trimmed));
}

function generateGrid(gridSize: number) {
  const container = document.querySelector(".container");
  const SQUARE_EDGE = (CONTAINER_SIZE - gridSize * 2) / gridSize;
  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.style.width = cell.style.height = `${SQUARE_EDGE}px`;
      cell.style.border = SQUARE_BORDER;
      cell.addEventListener("mouseout", () => {
        cell.style.background = "#" + randomColor();
      });
      cell.classList.add("cell");
      row.append(cell);
    }
    container?.append(row);
  }
}

function main() {
  const container = document.querySelector(".container");
  const setGrid = document.querySelector(".set-grid"),
    randomMode = document.querySelector(".random-mode");
  let gridSize = -1;

  setGrid?.addEventListener("click", () => {
    while (true) {
      let size = prompt(
        "Please enter the grid size. (The size must be between 1 and 100.)",
      );
      if (size == null || !isNumericString(size)) {
        alert("Please enter the valid grid size.");
        continue;
      }

      size = size.trim();
      let temp = +size;
      if (!Number.isInteger(temp)) {
        alert("Please enter the valid grid size.");
        continue;
      }

      if (temp > 100 || temp < 1) {
        alert("Please enter the valid grid size.");
        continue;
      }

      gridSize = temp;
      // console.log(gridSize);
      while (container?.firstChild) {
        if (container.lastChild) {
          container.removeChild(container.lastChild);
        }
      }

      generateGrid(gridSize);
      break;
    }
  });

  generateGrid(INITIAL_SIZE);
}

main();

export {};
