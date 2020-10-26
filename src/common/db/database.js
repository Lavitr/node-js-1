const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');

const connectToDB = fn =>
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to DB');
      fn();
    })
    .catch(err => {
      console.log('Can not connect to DB', err);
      // eslint-disable-next-line no-process-exit
      process.exit();
    });

module.exports = { connectToDB };
