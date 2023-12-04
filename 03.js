const { getLines } = require("./utils/input");

const lines = getLines("./inputs/03.txt");

function getLeftNum(index, line) {
  if (!line[index - 1]) {
    return 0;
  }
  let l = index - 1;
  while (l >= 0 && !isNaN(Number(line[l]))) {
    l--;
  }

  let num = line.slice(l + 1, index);
  if (isNaN(Number(num))) {
    return 0;
  } else {
    return num;
  }
}

function getRightNum(index, line) {
  if (!line[index + 1]) {
    return 0;
  }
  l = index + 1;
  while (l < line.length && !isNaN(Number(line[l]))) {
    l++;
  }

  let num = line.slice(index + 1, l);
  if (isNaN(Number(num))) {
    return 0;
  } else {
    return num;
  }
}

function puzzle_03_01(lines) {
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const nums = parseLine(lines[i]);
    nums.forEach((num) => {
      if (
        check_symbol(
          num.value,
          num.start_index,
          lines[i],
          lines[i - 1],
          lines[i + 1]
        )
      ) {
        sum += Number(num.value);
      }
    });
  }
  console.log(sum);
}

function check_symbol(num, index, line, line_up, line_down) {
  if (line[index - 1] && line[index - 1] != ".") {
    return true;
  }
  if (line[index + num.length] && line[index + num.length] != ".") {
    return true;
  }
  if (line_up) {
    if (line_up[index] != "." && isNaN(line_up[index])) {
      return true;
    }
    if (
      line_up[index - 1] &&
      line_up[index - 1] != "." &&
      isNaN(line_up[index - 1])
    ) {
      return true;
    }
    if (
      line_up[index + num.length - 1] != "." &&
      isNaN(line_up[index + num.length - 1])
    ) {
      return true;
    }
    if (
      line_up[index + num.length] &&
      line_up[index + num.length] != "." &&
      isNaN(line_up[index + num.length])
    ) {
      return true;
    }
    if (
      line_up[index + num.length - 2] &&
      line_up[index + num.length - 2] != "." &&
      isNaN(line_up[index + num.length - 2])
    ) {
      return true;
    }
  }
  if (line_down) {
    if (line_down[index] != "." && isNaN(line_down[index])) {
      return true;
    }
    if (
      line_down[index - 1] &&
      line_down[index - 1] != "." &&
      isNaN(line_down[index - 1])
    ) {
      return true;
    }
    if (
      line_down[index + num.length - 1] != "." &&
      isNaN(line_down[index + num.length - 1])
    ) {
      return true;
    }
    if (
      line_down[index + num.length] &&
      line_down[index + num.length] != "." &&
      isNaN(line_down[index + num.length])
    ) {
      return true;
    }
    if (
      line_down[index + num.length - 2] &&
      line_down[index + num.length - 2] != "." &&
      isNaN(line_down[index + num.length - 2])
    ) {
      return true;
    }
  }
  return false;
}

function parseLine(line) {
  let nums = [];
  let index = 0;
  while (index < line.length) {
    if (!/\d/.test(line[index])) {
      index++;
    } else {
      let sub = 0;
      while (line[index + sub] && /\d/.test(line[index + sub])) {
        sub++;
      }

      nums.push({
        value: line.slice(index, index + sub),
        start_index: index,
      });
      index += sub;
    }
  }
  return nums;
}

function get_gear(index, line, line_up, line_down) {
  let nums = [];

  //3444*
  if (
    line[index - 1] &&
    line[index - 1] != "." &&
    !isNaN(Number(line[index - 1]))
  ) {
    let l = index - 1;
    while (l >= 0 && !isNaN(Number(line[l]))) {
      l--;
    }
    nums.push(Number(line.slice(l + 1, index)));
  }
  // *3223232
  if (
    line[index + 1] &&
    line[index + 1] != "." &&
    !isNaN(Number(line[index + 1]))
  ) {
    let l = index + 1;
    while (l < line.length && !isNaN(Number(line[l]))) {
      l++;
    }
    nums.push(Number(line.slice(index + 1, l)));
  }

  if (line_up) {
    if (
      !isNaN(Number(line_up[index])) &&
      isNaN(Number(line_up[index - 1])) &&
      isNaN(Number(line_up[index + 1]))
    ) {
      nums.push(Number(line_up[index]));
    }

    let check = line_up.slice(index - 1, index + 2);
    if (check.length == 3 && !check.includes(".") && !isNaN(Number(check))) {
      nums.push(
        Number(
          getLeftNum(index, line_up) +
            line_up[index] +
            getRightNum(index, line_up)
        )
      );
    }

    if (line_up[index] == ".") {
      l = index - 1;
      if (
        line_up[index - 1] &&
        line_up[index - 1] != "." &&
        !isNaN(Number(line_up[index - 1]))
      ) {
        let l = index - 1;
        while (l >= 0 && !isNaN(Number(line_up[l]))) {
          l--;
        }
        nums.push(Number(line_up.slice(l + 1, index)));
      }
      l = index + 1;
      if (
        line_up[index + 1] &&
        line_up[index + 1] != "." &&
        !isNaN(Number(line_up[index + 1]))
      ) {
        let l = index + 1;
        while (l < line_up.length && !isNaN(Number(line_up[l]))) {
          l++;
        }
        nums.push(Number(line_up.slice(index + 1, l)));
      }
    } else {
      let l = index;
      if (!isNaN(Number(line_up[index]))) {
        if (!isNaN(Number(line_up[index - 1])) && isNaN(line_up[index + 1])) {
          while (l >= 0 && !isNaN(Number(line_up[l]))) {
            l--;
          }
          nums.push(Number(line_up.slice(l + 1, index + 1)));
        }
        if (isNaN(Number(line_up[index - 1])) && !isNaN(line_up[index + 1])) {
          l = index;
          while (l < line_up.length && !isNaN(Number(line_up[l]))) {
            l++;
          }
          nums.push(Number(line_up.slice(index, l)));
        }
      }
    }
  }

  if (line_down) {
    if (
      !isNaN(Number(line_down[index])) &&
      isNaN(Number(line_down[index - 1])) &&
      isNaN(Number(line_down[index + 1]))
    ) {
      nums.push(Number(line_down[index]));
    }

    let check = line_down.slice(index - 1, index + 2);
    if (check.length == 3 && !check.includes(".") && !isNaN(Number(check))) {
      nums.push(
        Number(
          getLeftNum(index, line_down) +
            line_down[index] +
            getRightNum(index, line_down)
        )
      );
    }

    if (line_down[index] == ".") {
      l = index - 1;
      if (
        line_down[index - 1] &&
        line_down[index - 1] != "." &&
        !isNaN(Number(line_down[index - 1]))
      ) {
        let l = index - 1;
        while (l >= 0 && !isNaN(Number(line_down[l]))) {
          l--;
        }
        nums.push(Number(line_down.slice(l + 1, index)));
      }
      l = index + 1;
      if (
        line_down[index + 1] &&
        line_down[index + 1] != "." &&
        !isNaN(Number(line_down[index + 1]))
      ) {
        let l = index + 1;
        while (l < line_down.length && !isNaN(Number(line_down[l]))) {
          l++;
        }
        nums.push(Number(line_down.slice(index + 1, l)));
      }
    } else {
      let l = index;
      if (!isNaN(Number(line_down[index]))) {
        if (
          !isNaN(Number(line_down[index - 1])) &&
          isNaN(line_down[index + 1])
        ) {
          while (l >= 0 && !isNaN(Number(line_down[l]))) {
            l--;
          }
          nums.push(Number(line_down.slice(l + 1, index + 1)));
        }
        if (
          isNaN(Number(line_down[index - 1])) &&
          !isNaN(line_down[index + 1])
        ) {
          l = index;
          while (l < line_down.length && !isNaN(Number(line_down[l]))) {
            l++;
          }
          nums.push(Number(line_down.slice(index, l)));
        }
      }
    }
  }
  if (nums.length == 2) {
    return nums[0] * nums[1];
  } else {
    return 0;
  }
}

function puzzle_03_02(lines) {
  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    lines[i].split("").forEach((c, index) => {
      if (c == "*") {
        sum += get_gear(index, lines[i], lines[i - 1], lines[i + 1]);
      }
    });
  }
  console.log(sum);
}

puzzle_03_02(lines);
