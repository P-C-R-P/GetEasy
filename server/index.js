const express = require('express');
const app = express();
const PORT = 3001;
const db = require('./models/index');
const cors = require('cors');
const router = require('./router');

// Authentication stuff
const session = require('express-session');

const corsConfig = {
  origin: 'http://localhost:3000',
  // do we need to define methods?
  methods: ["GET", "POST", "PUT", "OPTIONS", "HEAD"],
  // do we need credentials?
  credentials: true,
};

// Ask Atai
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
      secure: false,
    },
  })
);


app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('Failed to connect to server: ', error);
  }
})();
