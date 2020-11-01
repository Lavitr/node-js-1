const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const { createUser } = require('../../resources/users/user.service');

const connectToDB = fn =>
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(async () => {
      console.log('Connected to DB');
      await createUser({ name: 'admin', login: 'admin', password: 'admin' });
      fn();
    })
    .catch(err => {
      console.log('Can not connect to DB', err);
      // eslint-disable-next-line no-process-exit
      process.exit();
    });

module.exports = { connectToDB };
