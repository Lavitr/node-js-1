const User = require('../resources/users/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const signToken = async (login, password) => {
  const user = await User.findOne({ login }).exec();

  const existPassword = await bcrypt.compare(password, user.password);
  if (!existPassword || !user) return false;

  const token = await jwt.sign({ id: user._id, login }, JWT_SECRET_KEY, {
    expiresIn: '10m'
  });
  return token;
};

module.exports = { signToken };
