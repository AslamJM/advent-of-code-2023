const fs = require("fs");

function getLines(path) {
  const text = fs.readFileSync(path, { encoding: "utf-8" });
  return text.split(/\r\n/);
}

module.exports = { getLines };
