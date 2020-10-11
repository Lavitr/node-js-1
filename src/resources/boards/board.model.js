const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = 'column' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
