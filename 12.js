const { getLines } = require("./utils/input");

let lines = getLines("./inputs/12.txt");

function parse_lines() {
  return lines.map((l) => {
    let split = l.split(" ");
    let nums = split[1]
      .trim()
      .split(",")
      .map((n) => Number(n));

    return [split[0].trim(), nums];
  });
}

function find_arrangements(str, num) {
  // ...??##... 5
  let valid = new Map();

  for (let i = 0; i <= str.length - num; i++) {
    let candidate = str.slice(i, num + i);
    if (!candidate.includes(".")) {
      valid.set(i, candidate);
    }
  }

  let pointers = [];

  for (let i = num; i >= 0; i--) {
    valid.forEach((val, key) => {
      // let count = val.split("").filter((c) => c == "#").length;
      // if (count == i) {
      //   pointers.push(key);
      // }
      pointers.push(key);
    });
    if (pointers.length > 0) {
      break;
    }
  }
  return pointers;
}

let total = 0;

const fact = (a) => {
  if (a == 0) {
    return 1;
  }
  return a * fact(a - 1);
};

const ncr = (n, r) => {
  let top = 1;
  bottom = 1;
  for (let i = n; i > n - r; i--) {
    top *= i;
  }
  return top / fact(r);
};

function solve(input, confs) {
  if (input.length < confs.reduce((a, c) => a + c, 0)) {
    return;
  }

  if (confs.length == 1) {
    if (input.split("").filter((c) => c !== ".").length >= confs[0]) {
      let candidates = input
        .split(".")
        .filter((c) => c != "" && c.length >= confs[0]);
      let hash_counts = candidates.map(
        (c) => c.split("").filter((w) => w == "#").length
      );
      candidates.forEach((c, i) => {
        let unknown_count = c.length - hash_counts[i];
        let hashes_to_fit = confs[0] - hash_counts[i];
        if (unknown_count > 0 && hashes_to_fit > 0) {
          total += ncr(unknown_count, hashes_to_fit);
        }
      });
    }
  }
  let max_index = confs.indexOf(Math.max(...confs));

  let arrangements = find_arrangements(input, confs[max_index]);
  arrangements.forEach((ar) => {
    let left_s = input.slice(0, ar - 1);
    let left_cnf = confs.slice(0, max_index);
    let right_s = input.slice(ar + confs[max_index] + 1);
    let right_cnf = confs.slice(max_index + 1);

    if (left_cnf.length > 0 && left_s.length > 0) {
      solve(left_s, left_cnf);
    }
    if (right_cnf.length > 0 && right_s.length > 0) {
      solve(right_s, right_cnf);
    }
  });
}

// solve(".?#?#.#.??#?????##", [3, 1, 2, 2, 2]);
// console.log(total);

//console.log(find_arrangements("??#?????##", 2));

function q_12_01() {
  let sum_conf = 0;
  let inputs = [["???.###", [1, 1, 3]]];
  inputs.forEach((inp) => {
    total = 0;
    solve(inp[0], inp[1]);
    if (total == 0) {
      total++;
    }
    sum_conf += total;
  });
  console.log(sum_conf);
}

q_12_01();
