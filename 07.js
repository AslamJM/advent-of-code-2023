const { getLines } = require("./utils/input");

const lines = getLines("./inputs/07.txt");

const cards = "AKQJT98765432";

const sort_by_card_val = (a, b) => cards.indexOf(a) - cards.indexOf(b);

function group_cards(card, sort_fn) {
  const sorted_cards = card.split("").sort(sort_fn);
  return sorted_cards;
}

function get_type(card) {
  let [c1, c2, c3, c4, c5] = group_cards(card, sort_by_card_val);

  // five of a kind
  if (c1 == c5) {
    return 7;
  }

  // four of a kind
  if (c1 == c4 || c2 == c5) {
    return 6;
  }

  // full house
  if ((c1 == c3 && c4 == c5) || (c3 == c5 && c1 == c2)) {
    return 5;
  }

  // three of a kind
  if (c1 == c3 || c2 == c4 || c3 == c5) {
    return 4;
  }

  // two pair
  if (
    (c1 == c2 && c3 == c4) ||
    (c2 == c3 && c4 == c5) ||
    (c1 == c2 && c4 == c5)
  ) {
    return 3;
  }

  // one pair
  if (c1 == c2 || c2 == c3 || c3 == c4 || c4 == c5) {
    return 2;
  }

  return 1;
}

const sort_hand = (a, b) => {
  if (get_type(a.split(" ")[0]) == get_type(b.split(" ")[0])) {
    let i = 0;
    let cards_a = a.split(" ")[0];
    let cards_b = b.split(" ")[0];

    while (i < 5) {
      if (cards.indexOf(cards_a[i]) > cards.indexOf(cards_b[i])) {
        return 1;
      } else if (cards.indexOf(cards_a[i]) < cards.indexOf(cards_b[i])) {
        return -1;
      } else {
        i++;
      }
    }
    return 0;
  }
  return get_type(b.split(" ")[0]) - get_type(a.split(" ")[0]);
};

function p_07_01() {
  const sorted_lines = lines.sort(sort_hand);
  let total = 0;
  for (let i = 0; i < sorted_lines.length; i++) {
    total += Number(sorted_lines[i].split(" ")[1]) * (sorted_lines.length - i);
  }
  console.log(total);
}

//p_07_01();

/// part -02

const cards_2 = "AKQT98765432J";
const sort_by_card_val_joker = (a, b) =>
  cards_2.indexOf(a) - cards_2.indexOf(b);

function get_type_with_joker(card) {
  let sorted = group_cards(card, sort_by_card_val_joker);
  const joker_count = sorted.indexOf("J") == -1 ? 0 : 5 - sorted.indexOf("J");

  if (joker_count == 0) {
    return get_type(card);
  }

  if (joker_count == 5 || joker_count == 4) {
    return 7;
  }

  if (joker_count == 3) {
    let [c1, c2, ...jokers] = sorted;
    if (c1 == c2) {
      return 7;
    }
    return 6;
  }

  if (joker_count == 2) {
    let [c1, c2, c3, ...jokers] = sorted;
    if (c1 == c3) {
      return 7;
    }
    if (c1 == c2 || c2 == c3) {
      return 6;
    }

    return 4;
  }

  if (joker_count == 1) {
    let [c1, c2, c3, c4, joker] = sorted;
    if (c1 == c4) {
      return 7;
    }
    if (c1 == c3 || c2 == c4) {
      return 6;
    }
    if (c1 == c2 && c3 == c4) {
      return 5;
    }
    if (c1 == c2 || c2 == c3 || c3 == c4) {
      return 4;
    }

    if (c1 == c2 || c2 == c3 || c3 == c4) {
      return 3;
    }
    return 2;
  }
}

const sort_hand_with_joker = (a, b) => {
  if (
    get_type_with_joker(a.split(" ")[0]) == get_type_with_joker(b.split(" ")[0])
  ) {
    let i = 0;
    let cards_a = a.split(" ")[0];
    let cards_b = b.split(" ")[0];

    while (i < 5) {
      if (cards_2.indexOf(cards_a[i]) > cards_2.indexOf(cards_b[i])) {
        return 1;
      } else if (cards_2.indexOf(cards_a[i]) < cards_2.indexOf(cards_b[i])) {
        return -1;
      } else {
        i++;
      }
    }
    return 0;
  }
  return (
    get_type_with_joker(b.split(" ")[0]) - get_type_with_joker(a.split(" ")[0])
  );
};

function p_07_02() {
  const sorted_lines = lines.sort(sort_hand_with_joker);
  let total = 0;
  for (let i = 0; i < sorted_lines.length; i++) {
    total += Number(sorted_lines[i].split(" ")[1]) * (sorted_lines.length - i);
  }
  console.log(total);
}

p_07_02();

//console.log(get_type_with_joker("KK677"));
