const db = require('../models/index');

const authMiddleware = async (req, res, next) => {
  try {
    //console.log('SESSION');
    //console.log(req.session);
    const { uid }  = req.session;
    //console.log('uid', uid);
    const user = await db.user.findOne( { where :{ id : uid } });
    //console.log('user', user);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    // console.log('YEAH IT IS HERE');
    res.status(401).send(error);
  }
};

module.exports = authMiddleware;