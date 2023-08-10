const db = require('../models/index');
const bcrypt = require('bcryptjs');

async function checkEmailDB (email) {
  return await db.user.findOne({ where: { email } });
}

async function checkEmail (req, res) {
  const email = req.body.email;
  const check = await checkEmailDB(email);
  if (check === null) {
    res.status(404).send({ key: 'No matching email in database.' });
    return;
  }
  res.status(200).send(check);
}

function checkPassword (user, req, res) {
  if (bcrypt.compareSync(req.body.password, user.dataValues.password)) {
    req.session.uid = user.id;
    return res.status(200).send(user);
  }
  return res.status(400).send({ key: 'Incorrect password.' });
}

async function createUser (req, res) {
  console.log(req.session);
  const { name, email, password } = req.body;
  const user = await checkEmailDB(email);
  if (user) {
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const createdUser = await db.user.create({
      name,
      email,
      password: hashedPassword
    });
    const { id } = createdUser;
    req.session.uid = id;
    res.status(201);
    res.send(createdUser);
  } catch (error) {
    console.log('Create user failed: ', error);
    res.status(400);
  }
}

async function checkUser (req, res) {
  const { email } = req.body;
  const user = await checkEmailDB(email);
  if (user) {
    return checkPassword(user, req, res);
  }
}

async function getAllUsers (req, res) {
  try {
    const allUsers = await db.user.findAll({});
    res.status = 200;
    res.send(allUsers);
  } catch (error) {
    console.log('Get all items failed: ', error);
  }
}

/*
const create = async (req, res) => {
  const { email, password } = req.body;
  //is there a user?
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' }); //debatable for security
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const user = await newUser.save();
    req.session.uid = user._id;   //req.session -> {name: 'sid', sessionId: <some id>, cookie: {<cookie props}, uid: user id}
    res.status(201).send(user); //probably don't want to send the password hash
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};
*/
module.exports = { createUser, checkEmail, checkUser, getAllUsers };
