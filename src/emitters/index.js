const { EventEmitter } = require("events");
const databaseEmitter = new EventEmitter();
const feedEmitter = new EventEmitter();

module.exports = {
  databaseEmitter,
  feedEmitter
};
