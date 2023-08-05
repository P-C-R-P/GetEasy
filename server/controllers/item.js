const db = require('../models/index');

async function createItem(req, res) {
  console.log(req.body);
  const { name, description, weight, userId } = req.body;
  try {
    const createdItem = await db.item.create({
      name,
      description,
      weight,
      userId,
    });
    res.status = 201;
    res.send(createdItem);
  } catch (error) {
    console.log('Failed to create item: ', error);
  }
};

module.exports = createItem;
