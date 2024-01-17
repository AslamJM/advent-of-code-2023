const { getLines, get_chunks } = require("./utils/input");

let lines = getLines("./inputs/13.txt");
const chunks = get_chunks("./inputs/13.txt");

function match(a, b) {
  //return a.every((a, i) => a == b[i]);
  return a == b;
}

function cols(chunk) {
  let lines = chunk.split(/\r\n/);
  let c = [];

  for (let i = 0; i < lines[0].length; i++) {
    let t = [];
    for (let j = 0; j < lines.length; j++) {
      t.push(lines[j][i]);
    }
    c.push(t.join("").trim());
  }
  return c;
}

function get_rows(chunk) {
  return chunk.split(/\r\n/).map((l) => l.trim());
}

function mirror(inputs) {
  let holds = true;
  for (let i = 0; i < inputs.length / 2; i++) {
    if (!match(inputs[i], inputs[inputs.length - 1 - i])) {
      holds = false;
    }
  }
  return holds;
}

function check_cols_left(cols, l) {
  if (mirror(cols)) {
    if (cols.length <= 1) {
      return -1;
    }
    return l;
  } else {
    l++;
    return check_cols_left(cols.slice(1), l);
  }
}

function check_cols_right(cols, r) {
  if (mirror(cols)) {
    if (cols.length <= 1) {
      return -1;
    }
    return r;
  } else {
    r--;
    return check_cols_right(cols.slice(0, r), r);
  }
}

function p_13_01() {
  let total = 0;

  chunks.forEach((chunck) => {
    let columns = cols(chunck);
    let rows = get_rows(chunck);

    let left = check_cols_left(columns, 0);

    if (left >= 0) {
      total += (columns.length - left) / 2 + left;
    } else {
      let right = check_cols_right(columns, columns.length);

      if (right >= 0) {
        total += right / 2;
      } else {
        let top = check_cols_left(rows, 0);
        if (top >= 0) {
          total += ((rows.length - top) / 2 + top) * 100;
        } else {
          let bottom = check_cols_right(rows, rows.length);
          if (bottom > 0) {
            total += (bottom / 2) * 100;
          }
        }
      }
    }
  });

  console.log(total);
}

//p_13_01();

// part 02

function mutate_line(line, index) {
  if (line[index] == ".") {
    return line.slice(0, index) + "#" + line.slice(index + 1, line.length);
  } else {
    return line.slice(0, index) + "." + line.slice(index + 1, line.length);
  }
}
console.log(mutate_line("#####.##."));

function p_13_02() {
  let total = 0;
  chunks.forEach((chunck) => {
    let columns = cols(chunck);
    let rows = get_rows(chunck);

    columns.forEach((col) => {
      let val = 0;
    });
  });
}
