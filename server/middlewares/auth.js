const db = require('../model/index');


// DOES NOT DO A SINGLE THING
const authMiddleware = async (req, res, next) => {  
  try {
    const { uid } = req.session;
    const user = await db.user.findOne( { where :{ id : uid } });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;