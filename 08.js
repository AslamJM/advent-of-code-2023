const { getLines, get_text } = require("./utils/input");

const node_lines = getLines("./inputs/08-node.txt");
const commands = get_text("./inputs/08-commands.txt").trim();

// BNR = (DLB, QNM)

class Node {
  constructor(place, left, right) {
    this.place = place;
    this.left = left;
    this.right = right;
  }
}

class Map {
  nodes = [];
  current = null;

  add_node(node) {
    if (!this.nodes.find((n) => n.place == node.place)) {
      this.nodes.push(node);
    }
  }

  move_left() {
    const left = this.nodes.find((n) => n.place == this.current.left);
    this.current = left;
  }

  move_right() {
    const right = this.nodes.find((n) => n.place == this.current.right);
    this.current = right;
  }

  set_current() {
    const start = this.nodes.find((n) => n.place == "AAA");
    this.current = start;
  }

  reached_goal() {
    return this.current.place == "ZZZ";
  }
}

function parse_node(node) {
  const [l, r] = node.split("=");
  const place = l.trim();
  const left = r.trim().slice(1, 4);
  const right = r.trim().slice(6, 9);
  return new Node(place, left, right);
}

function initialze_map() {
  const map = new Map();

  node_lines.forEach((line) => {
    let node = parse_node(line);
    map.add_node(node);
  });
  map.set_current();
  return map;
}

function p_08_01() {
  const map = initialze_map();

  let steps = 0;
  let rotations = 0;

  while (!map.reached_goal()) {
    if (steps == commands.length) {
      steps = 0;
      rotations++;
    }

    if (commands[steps] == "L") {
      map.move_left();
      steps++;
    } else {
      map.move_right();
      steps++;
    }
  }
  console.log(rotations * commands.length + steps);
}

//p_08_01();

class GhostMap {
  constructor(node) {
    this.current = node;
  }
  nodes = [];

  add_node(node) {
    if (!this.nodes.find((n) => n.place == node.place)) {
      this.nodes.push(node);
    }
  }

  move_left() {
    const left = this.nodes.find((n) => n.place == this.current.left);
    this.current = left;
  }

  move_right() {
    const right = this.nodes.find((n) => n.place == this.current.right);
    this.current = right;
  }

  reached_goal() {
    return this.current.place.endsWith("Z");
  }
}

// function initialize_ghost_map() {
//   const map = new GhostMap();

//   node_lines.forEach((line) => {
//     let node = parse_node(line);
//     map.add_node(node);
//   });
//   map.set_current();
//   return map;
// }

// function p_08_02() {
//   const map = initialize_ghost_map();

//   let steps = 0;
//   let rotations = 0;

//   while (!map.reached_goal()) {
//     if (steps == commands.length) {
//       steps = 0;
//       rotations++;
//     }

//     if (commands[steps] == "L") {
//       map.move_left();
//       steps++;
//     } else {
//       map.move_right();
//       steps++;
//     }
//   }
//   console.log(rotations * commands.length + steps);
// }

function lcm(numbers) {
  function gcd(a, b) {
    if (a < b) {
      let t = a;
      a = b;
      b = t;
    }
    return b == 0 ? a : gcd(b, a % b);
  }
  return numbers.reduce((acc, num) => (acc * num) / gcd(acc, num), 1);
}

function p_08_02() {
  const start_nodes = node_lines
    .map((n) => parse_node(n))
    .filter((n) => n.place.endsWith("A"));

  const steps_for_each_node = start_nodes.map((node) => {
    const map = new GhostMap(node);

    node_lines.forEach((line) => {
      let node = parse_node(line);
      map.add_node(node);
    });

    let steps = 0;
    let rotations = 0;

    while (!map.reached_goal()) {
      if (steps == commands.length) {
        steps = 0;
        rotations++;
      }

      if (commands[steps] == "L") {
        map.move_left();
        steps++;
      } else {
        map.move_right();
        steps++;
      }
    }
    return rotations * commands.length + steps;
  });

  console.log(lcm(steps_for_each_node));
}

p_08_02();
