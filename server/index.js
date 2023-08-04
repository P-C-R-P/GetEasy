const express = require('express');
const app = express();
const port = 3001;
const db = require('./model/index');
const cors = require('cors');
const router = require('./router');
const session = require('express-session');


const corsConfig = {
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
};

// DOES NOT DOA SINGLE THING
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


// DELETE
app.get('*', (req, res) => {
  res.status = 404;
  res.send('Page not found');
});


// MAYBE CONSIDER CHANGING .THEN TO ASYNC AWAIT
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}).catch((err) => {
  console.log('Failed to connect: ', err);  
});

