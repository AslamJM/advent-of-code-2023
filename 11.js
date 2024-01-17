const { getLines } = require("./utils/input");

let lines = getLines("./inputs/11.txt");

function check_row(i) {
  let j = 0;
  while (j < lines[i].length) {
    if (lines[i].trim()[j] !== ".") {
      return false;
    }
    j++;
  }
  return true;
}

function check_column(i) {
  let j = 0;
  while (j < lines.length) {
    if (lines[j][i] !== ".") {
      return false;
    }
    j++;
  }
  return true;
}

function expand_image() {
  let expand_rows = [];
  let expand_cols = [];
  let i = 0;
  while (i < lines.length) {
    if (check_row(i)) {
      expand_rows.push(i);
    }
    i++;
  }

  let col = 0;
  while (col < lines[0].length) {
    if (check_column(col)) {
      expand_cols.push(col);
    }
    col++;
  }

  let expanded_image = lines;
  expand_rows.forEach((row, index) => {
    expanded_image = expanded_image
      .slice(0, row + index)
      .concat(expanded_image[row + index])
      .concat(expanded_image.slice(row + index));
  });

  expand_cols.forEach((col, index) => {
    for (let i = 0; i < expanded_image.length; i++) {
      expanded_image[i] =
        expanded_image[i].slice(0, col + index) +
        "." +
        expanded_image[i].slice(col + index);
    }
  });
  return expanded_image;
}

function getPositions() {
  let image = expand_image();
  let galaxies = [];

  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      if (image[i][j] != ".") {
        galaxies.push([j, i]);
      }
    }
  }
  return galaxies;
}

function p_11_01() {
  let galaxies = getPositions();
  function get_distance_sum(g) {
    let sum = 0;
    for (let j = 1; j < g.length; j++) {
      sum += Math.abs(g[0][0] - g[j][0]) + Math.abs(g[0][1] - g[j][1]);
    }
    return sum;
  }
  let total = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    total += get_distance_sum(galaxies.slice(i));
  }
  console.log(total);
}

const printImage = () => {
  expand_image().forEach((l) => console.log(l));
};

//p_11_01();

// part 02

function get_empty_rc() {
  let expand_rows = [];
  let expand_cols = [];
  let i = 0;
  while (i < lines.length) {
    if (check_row(i)) {
      expand_rows.push(i);
    }
    i++;
  }

  let col = 0;
  while (col < lines[0].length) {
    if (check_column(col)) {
      expand_cols.push(col);
    }
    col++;
  }
  return { expand_cols, expand_rows };
}

let expanding_rows = get_empty_rc().expand_rows;
let expanding_cols = get_empty_rc().expand_cols;

function get_distance_between_pair(a, b, fold) {
  let expand_rows = expanding_rows.filter(
    (row) => row < Math.max(a[1], b[1]) && row > Math.min(a[1], b[1])
  );

  let expand_cols = expanding_cols.filter(
    (col) => col < Math.max(a[0], b[0]) && col > Math.min(a[0], b[0])
  );

  return (
    Math.abs(a[0] - b[0]) +
    Math.abs(a[1] - b[1]) +
    expand_rows.length * fold +
    expand_cols.length * fold -
    expand_rows.length -
    expand_cols.length
  );
}

function get_pair_sum(g) {
  let sum = 0;
  for (let i = 1; i < g.length; i++) {
    sum += get_distance_between_pair(g[0], g[i], 1000000);
  }
  return sum;
}

function get_galaxy_position() {
  let galaxies = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] != ".") {
        galaxies.push([j, i]);
      }
    }
  }
  return galaxies;
}

function p_11_02() {
  let galaxies = get_galaxy_position();

  let total = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    total += get_pair_sum(galaxies.slice(i));
  }
  console.log(total);
}

p_11_02();
