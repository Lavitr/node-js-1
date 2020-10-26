const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

module.exports = mongoose.model('User', userSchema);
