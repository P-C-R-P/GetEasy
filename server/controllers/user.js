const db = require('../models/index');
const bcrypt = require('bcryptjs');

async function checkEmailDB(email) {
  return await db.user.findOne({ where: { email } });
}

async function checkEmail(req, res) {
  const email = req.body.email;
  const check = await checkEmailDB(email);
  if (check === null) {
    res.status(200).send({key: 'No matching email in database.'});
    return;
  }
  res.status(200).send(check);
}

async function createUser(req, res) {
  const { name, email, password } = req.body;
  const user = await checkEmailDB(email);
  if (user) {
    if (bcrypt.compareSync(password, user.dataValues.password)) {
      req.session.uid = user.id;
      return res.status(200).send(user);
    }
    return res.status(400).send({ key: 'Incorrect password.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const createdUser = await db.user.create({
      name,
      email,
      password: hashedPassword,
    });
    const { id } = createdUser;
    req.session.uid = id;
    res.status(201);
    res.send(createdUser);
  } catch (error) {
    console.log('Create user failed: ', error);
  }
}

module.exports = { createUser, checkEmail };
