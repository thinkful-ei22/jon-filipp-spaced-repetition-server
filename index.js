'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport= require('passport');
const jwtStrategy = require('./passport/jwt');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
const localStrategy = require('./passport/local');
// const {dbConnect} = require('./db-knex');

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

passport.use(localStrategy);
passport.use(jwtStrategy);


app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
