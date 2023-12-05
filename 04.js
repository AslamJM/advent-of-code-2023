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

function puzzle_04_02(lines) {
  let card_count = 0;
  for (let i = 0; i < lines.length; i++) {
    let { winning_nums, your_nums } = parse_line(lines[i]);

    let match_count = 0;
    your_nums.forEach((num) => {
      let index = winning_nums.indexOf(num);
      if (index >= 0) {
        match_count++;
        winning_nums[index] = "_";
      }
    });
    if (match_count >= 1) {
      let checked_lines = lines.slice(0, i + 1);
      let new_cards = lines.slice(i + 1, i + match_count + 1);
      let sorted_cards = [...new_cards, ...new_cards].sort(
        (a, b) => get_card_num(a) - get_card_num(b)
      );
      let rest = lines.slice(i + 1 + match_count, lines.length);

      lines = [...checked_lines, ...sorted_cards, ...rest];
    }
  }
  console.log(lines.length);
}

puzzle_04_02(lines);
