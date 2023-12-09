const { getLines } = require("./utils/input");

const lines = getLines("./inputs/06.txt");

let times = [];
let distances = [];

lines[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .forEach((item) => item != "" && times.push(Number(item)));

lines[1]
  .split(":")[1]
  .trim()
  .split(" ")
  .forEach((item) => item != "" && distances.push(Number(item)));

function get_distance(total_time, pressing_time) {
  const speed = pressing_time;
  return (total_time - pressing_time) * speed;
}

function get_range_game(index) {
  const time = times[index];
  const distance = distances[index];

  let possibility = 0;

  for (let i = 0; i < time; i++) {
    if (get_distance(time, i) > distance) {
      possibility++;
    }
  }
  return possibility;
}

function p_06_01() {
  let ways = 1;
  for (let i = 0; i < times.length; i++) {
    ways *= get_range_game(i);
  }
  console.log(ways);
}

//p_06_01();

// part 2

function quadratic_solution(distance, time) {
  // x^2 - x*time - distance >0

  let x1 = (time + Math.sqrt(time * time - 4 * distance)) / 2;
  let x2 = (time - Math.sqrt(time * time - 4 * distance)) / 2;

  if (x1 > x2) return [Math.floor(x1), Math.ceil(x2)];
}

function p_06_02() {
  let time = times.join("");
  let distance = distances.join("");

  let [x1, x2] = quadratic_solution(Number(distance), Number(time));
  console.log(x1 - x2 + 1);
}

p_06_02();
