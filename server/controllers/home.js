const db = require('../models/index');

const getAllItems = async (req, res) => {
  try {
    const allItems = await db.item.findAll({
      include: [
        db.address,
        db.offer
      ]
    });
    res.status = 200;
    res.send(allItems);
  } catch (error) {
    console.log('Get all items failed: ', error);
  }
};

const getOwnItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const allOwnItems = await db.user.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: db.item,
          include: db.offer
        },
        {
          model: db.item,
          include: db.address
        }
      ]
    });

    res.status = 200;
    res.send(allOwnItems.items);
  } catch (error) {
    console.log('Failed ', error);
  }
};

module.exports = { getAllItems, getOwnItems };
