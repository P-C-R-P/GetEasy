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
    res.status = 400;
    res.send('Failed to create item; please provide a name.');
  }
};

module.exports = createItem;