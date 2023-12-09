const { getLines } = require("./utils/input");

const lines = getLines("./inputs/04.txt");

function parse_line(line) {
  let nums = {
    winning_nums: [],
    your_nums: [],
  };
  let [winning_nums_split, your_nums_split] = line.split("|");

  winning_nums_split
    .trim()
    .split(":")[1]
    .trim()
    .split(" ")
    .forEach((sp) => sp != "" && nums.winning_nums.push(Number(sp)));

  your_nums_split
    .trim()
    .split(" ")
    .forEach((sp) => sp != "" && nums.your_nums.push(Number(sp)));

  return nums;
}

function get_card_num(card) {
  return Number(card.split("|")[0].split(":")[0].split(" ").at(-1));
}

function puzzle_04_01(lines) {
  let sum = 0;

  lines.forEach((line) => {
    let { winning_nums, your_nums } = parse_line(line);
    let match_count = 0;
    your_nums.forEach((num) => {
      let i = winning_nums.indexOf(num);
      if (i >= 0) {
        match_count++;
        winning_nums[i] = "_";
      }
    });
    if (match_count >= 1) {
      sum += Math.pow(2, match_count - 1);
    }
  });
  console.log(sum);
}

//puzzle_04_01(lines);

// part 02

function find_copies(line) {
  let card_num = get_card_num(line);
  console.log(card_num);
  let copies = 1;

  for (let i = 0; i < card_num - 1; i++) {
    let matches = 0;
    let { winning_nums, your_nums } = parse_line(lines[i]);
    your_nums.forEach((num) => {
      let k = winning_nums.indexOf(num);
      if (k >= 0) {
        matches++;
        winning_nums[k] = "_";
      }
    });
    if (card_num - get_card_num(lines[i]) >= matches) {
      copies++;
    }
  }
  return copies;
}

function get_matches(line) {
  let { winning_nums, your_nums } = parse_line(line);
  let matches = 0;

  your_nums.forEach((num) => {
    let k = winning_nums.indexOf(num);
    if (k >= 0) {
      matches++;
      winning_nums[k] = "_";
    }
  });

  return matches;
}

function can_generate_card(line, card_number) {
  let can = false;

  const matches = get_matches(line);
  if (card_number - get_card_num(line) <= matches) {
    can = true;
  }

  return can;
}

function getCopies(card_number, memo) {
  if (memo[card_number]) {
    return memo[card_number];
  }
  if (card_number > 1) {
    let card_count = 1;
    card_count += lines.slice(0, card_number - 1).reduce((acc, line, index) => {
      if (can_generate_card(line, card_number)) {
        return acc + getCopies(index + 1, memo);
      } else {
        return acc;
      }
    }, 0);
    memo[card_number] = card_count;
    return card_count;
  }
}

function puzzle_04_02() {
  let total = 0;
  let memo = { 1: 1 };

  for (let i = 1; i <= lines.length; i++) {
    total += getCopies(i, memo);
  }
  console.log(total);
}

puzzle_04_02();

// console.log(get_matches("Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1"));

// console.log(
//   can_generate_card("Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1", 5)
// );
