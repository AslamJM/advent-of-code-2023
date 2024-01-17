const fs = require("fs");

function get_text(path) {
  return fs.readFileSync(path, { encoding: "utf-8" });
}

function getLines(path) {
  const text = fs.readFileSync(path, { encoding: "utf-8" });
  return text.split(/\r\n/);
}

function get_chunks(path) {
  const text = fs.readFileSync(path, { encoding: "utf-8" });
  return text.split(/\r?\n\s*\r?\n/);
}

module.exports = { getLines, get_text, get_chunks };
