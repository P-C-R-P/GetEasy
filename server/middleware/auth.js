const db = require('../models/index');

const authMiddleware = async (req, res, next) => {
  try {
    const { uid } = req.session;
    const user = await db.user.findOne({ where: { id: uid } });
    if (!user) res.send(401);
    else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

module.exports = authMiddleware;
