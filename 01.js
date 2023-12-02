const { getLines } = require("./utils/input");

const lines = getLines("./inputs/01.txt");

// part 01
let sum = 0;

// lines.forEach((line) => {
//   let nums = [];
//   for (let char of line) {
//     if (Number(char)) {
//       nums.push(Number(char));
//     }
//   }

//   sum += nums[0] * 10 + nums.at(-1);
//   nums = [];
// });

// part 2
const num_strings = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

lines.forEach((line) => {
  let nums = [];
  for (let i = 0; i < line.length; i++) {
    if (Number(line[i])) {
      nums.push(Number(line[i]));
    } else {
      let num_letter_3 = line.slice(i, i + 3);
      let num_letter_4 = line.slice(i, i + 4);
      let num_letter_5 = line.slice(i, i + 5);

      if (num_strings.includes(num_letter_3)) {
        nums.push(num_strings.indexOf(num_letter_3) + 1);
      } else if (num_strings.includes(num_letter_4)) {
        nums.push(num_strings.indexOf(num_letter_4) + 1);
      } else if (num_strings.includes(num_letter_5)) {
        nums.push(num_strings.indexOf(num_letter_5) + 1);
      }
    }
  }
  sum += nums[0] * 10 + nums.at(-1);
});

console.log(sum);
