const { getLines } = require("./utils/input");

const lines = getLines("./inputs/02.txt");

function puzzle_02_01(red, blue, green) {
  let sum = 0;

  lines.forEach((line) => {
    let game_split = line.split(":");
    let possibility = true;

    game_split[1].split(";").forEach((set) => {
      set.split(",").forEach((color) => {
        let entry = color.trim();
        if (entry.endsWith("d")) {
          if (red < Number(entry.split(" ")[0])) {
            possibility = false;
            return;
          }
        } else if (entry.endsWith("n")) {
          if (green < Number(entry.split(" ")[0])) {
            possibility = false;
            return;
          }
        } else if (entry.endsWith("e")) {
          if (blue < Number(entry.split(" ")[0])) {
            possibility = false;
            return;
          }
        }
      });
      if (!possibility) {
        return;
      }
    });
    if (possibility) {
      sum += Number(game_split[0].split(" ")[1]);
    }
  });
  console.log(sum);
}

function puzzle_02_02() {
  let sum = 0;

  lines.forEach((line) => {
    let game_split = line.split(":");

    let red_max = 0;
    let green_max = 0;
    let blue_max = 0;

    game_split[1].split(";").forEach((set) => {
      set.split(",").forEach((color) => {
        let entry = color.trim();
        if (entry.endsWith("d")) {
          if (Number(entry.split(" ")[0]) > red_max) {
            red_max = Number(entry.split(" ")[0]);
          }
        } else if (entry.endsWith("n")) {
          if (Number(entry.split(" ")[0]) > green_max) {
            green_max = Number(entry.split(" ")[0]);
          }
        } else if (entry.endsWith("e")) {
          if (Number(entry.split(" ")[0]) > blue_max) {
            blue_max = Number(entry.split(" ")[0]);
          }
        }
      });
    });
    sum += red_max * green_max * blue_max;
    red_max = green_max = blue_max = 0;
  });
  console.log(sum);
}

//puzzle_02_01(12, 14, 13);
puzzle_02_02();
