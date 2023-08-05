const db = require('../models/index');
const bcrypt = require('bcryptjs');

async function checkEmail(email) {
  return await db.user.findOne({ where: { email } });
}

async function createUser(req, res) {
  const { name, email, password } = req.body;
  const user = await checkEmail(email);
  if (user && ) {
    req.session.uid = user.id;
    return res.status(200).send(user);
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

module.exports = createUser;
