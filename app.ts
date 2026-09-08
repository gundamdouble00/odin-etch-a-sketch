const CONTAINER_SIZE = 640;
const INITIAL_SIZE = 16;

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
  for (let i = 0; i < gridSize ** 2; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.style.width = squareDiv.style.height = `${SQUARE_EDGE}px`;

    console.log(SQUARE_EDGE);

    squareDiv.style.border = "1px solid black";
    squareDiv.addEventListener("mouseout", () => {
      squareDiv.style.background = "#" + randomColor();
    });
    container?.append(squareDiv);
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
