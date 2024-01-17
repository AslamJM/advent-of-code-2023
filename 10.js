const { getLines } = require("./utils/input");

let lines = getLines("./inputs/10.txt");

function get_start() {
  let s;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].indexOf("S") > -1) {
      s = [i, rows[i].indexOf("S")];
      break;
    }
  }
  return s;
}

const pipe_mapping = {
  "|": "7F|",
  "-": "7J-",
  7: "|L",
};

function p_10_01() {
  let r = lines.length;
  let c = lines[0].length;

  let start = get_start();

  let visited = [];
  let path = [];

  function check_neighbour(x, y) {
    let pipe = lines[y][x];
  }
  console.log([r, c]);
}

p_10_01();
