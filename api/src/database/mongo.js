const parameters = require('../../parameters')

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const host = parameters.mongoHost

//NOTE No need for username/password as database works in private network
const params = {
  //user: process.env.MONGO_USER,
  //pass: process.env.MONGO_PASS,
}

const connect = (host, opts = {}) => {

  console.info(`Connecting to database @ ${host} ...`);

  opts.useNewUrlParser = true
  opts.useFindAndModify = false
  opts.useUnifiedTopology = true

  return mongoose.connect(host, opts)
}

mongoose.connection.on('connected', () => {

  console.info(`Connected to database @ ${host}`);

})

mongoose.connection.on('error', (err) => {

  console.error(`Error with mongo database @ ${host}`);
  console.error(err.stack);

})

mongoose.connection.on('disconnected', () => {

  console.info(`Disconnected from database @ ${host}`);

  if (process.env.NODE_ENV === 'production') {
    setTimeout(() => {
      connect(host, params)
    }, 1000)
  }

});

module.exports = {
  connect: () => connect(host, params),
  disconnect: () => mongoose.disconnect(),
  dropdb: () => {

    console.info(`Dropping database at @ ${host}`);

    mongoose.connection.db.dropDatabase();
  },
};
