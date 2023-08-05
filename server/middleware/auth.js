const db = require('../models/index');

// Ask Atai
const authMiddleware = async (req, res, next) => {
  try {
    const { uid } = req.session;
    const user = await db.user.findOne( { where :{ id : uid } });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = authMiddleware;