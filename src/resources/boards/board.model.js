const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
);

boardSchema.statics.toResponse = board => {
  const { _id, title, columns } = board;
  const filterColumns = columns.map(column => ({
    id: column._id,
    title: column.title,
    order: column.order
  }));
  return { id: _id, title, columns: filterColumns };
};

boardSchema.statics.toDB = (id, board) => {
  const { title, columns } = board;
  const filterColumns = columns.map(column => ({
    _id: column.id,
    title: column.title,
    order: column.order
  }));
  return { _id: id, title, columns: filterColumns };
};

module.exports = mongoose.model('Board', boardSchema);
