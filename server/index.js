const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const session = require('express-session');

const corsConfig = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'HEAD'],
  credentials: true
};

app.set('trust proxy', 1);

app.use(
  session({
    name: 'sid',
    saveUninitialized: true,
    resave: false,
    secret: 'SECRET',
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: true,
      httpOnly: true,
      secure: false
    }
  })
);

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

module.exports = app;
