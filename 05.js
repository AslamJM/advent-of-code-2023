const fs = require("fs");

const file_content = fs.readFileSync("./inputs/05.txt", { encoding: "utf-8" });

const seeds = fs
  .readFileSync("./inputs/05-seeds.txt", { encoding: "utf-8" })
  .split(" ")
  .filter((sp) => /\d/.test(sp))
  .map((n) => Number(n));

const sections = file_content.split("\r\n").filter((se) => !se == "");

function get_mapping(lines, num) {
  let num_destination = num;

  lines.forEach((line) => {
    let [destination, source, range] = line
      .split(" ")
      .filter((s) => /\d/.test(s))
      .map((n) => Number(n));

    if (num >= source && num < source + range) {
      num_destination = destination + num - source;
    }
  });

  return num_destination;
}

function find_location(seed) {
  let location = seed;
  let lines = [];

  let line_index = 0;

  while (line_index < sections.length) {
    if (!/\d/.test(sections[line_index])) {
      line_index++;
      while (/\d/.test(sections[line_index])) {
        lines.push(sections[line_index]);
        line_index++;
      }
      if (lines.length > 0) {
        location = get_mapping(lines, location);
        lines = [];
      }
    }
  }

  return location;
}

function puzzle_05_01() {
  let location_min = Infinity;

  seeds.forEach((seed) => {
    const seed_location = find_location(seed);
    if (seed_location < location_min) {
      location_min = seed_location;
    }
  });
  console.log(location_min);
}

function find_mapping_reverse(lines, num) {
  let reverse_map = num;

  lines.forEach((line) => {
    let [destination, source, range] = line
      .split(" ")
      .filter((s) => /\d/.test(s))
      .map((n) => Number(n));

    if (num >= destination && num < destination + range) {
      reverse_map = source + num - destination;
    }
  });
  return reverse_map;
}

function find_seed_reverse(location) {
  let seed = location;

  let lines = [];
  let line_index = sections.length - 1;

  while (line_index >= 0) {
    if (/\d/.test(sections[line_index])) {
      lines.push(sections[line_index]);
      line_index--;
    } else {
      seed = find_mapping_reverse(lines, seed);
      lines = [];
      line_index--;
    }
  }

  for (let i = 0; i < seeds.length; i += 2) {
    if (seed >= seeds[i] && seed < seeds[i] + seeds[i + 1]) {
      return true;
    }
  }
  return false;
}

function puzzle_05_02() {
  let location_found = false;
  let location = 0;

  while (!location_found) {
    if (find_seed_reverse(location)) {
      location_found = true;
    } else {
      location++;
    }
  }
  console.log(location);
}

puzzle_05_02();

//console.log(find_seed_reverse(46));
