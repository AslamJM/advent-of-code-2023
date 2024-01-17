const { getLines } = require("./utils/input");

const lines = getLines("./inputs/09.txt");

function check_goal(sequence) {
  return sequence.every((e) => e === 0);
}

function next(sequence) {
  let result = [];

  for (let i = sequence.length - 1; i >= 1; i--) {
    result.unshift(sequence[i] - sequence[i - 1]);
  }
  return result;
}

function generate_results() {
  let results = {};

  lines.forEach((line, i) => {
    let nums = line.split(" ").map((n) => Number(n));
    let sequences = [nums];

    while (!check_goal(nums)) {
      let sequence = next(nums);
      nums = sequence;
      sequences.push(sequence);
    }
    results[i] = sequences;
  });
  return results;
}

function calculate_extrapolated(sequences) {
  let val = 0;
  for (let i = sequences.length - 1; i >= 0; i--) {
    val += sequences[i].at(-1);
  }
  return val;
}

function p_08_01() {
  const sequences = generate_results();
  let total = Object.values(sequences).reduce(
    (acc, seq) => acc + calculate_extrapolated(seq),
    0
  );
  console.log(total);
}

//p_09_01();

function calculate_extrapolated_02(sequences) {
  sequences[sequences.length - 1].unshift(0);
  for (let i = sequences.length - 2; i >= 0; i--) {
    sequences[i].unshift(sequences[i][0] - sequences[i + 1][0]);
  }
  return sequences[0][0];
}

function p_08_02() {
  const sequences = generate_results();
  let total = Object.values(sequences).reduce(
    (acc, seq) => acc + calculate_extrapolated_02(seq),
    0
  );
  console.log(total);
}

p_09_02();
