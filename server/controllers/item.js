const db = require('../models/index');

async function createItem (req, res) {
  const { name, description, weight, userId, weightMeasurement } = req.body;
  try {
    const createdItem = await db.item.create({
      name,
      description,
      weight,
      userId,
      weightMeasurement
    });
    res.status = 201;
    res.send(createdItem);
  } catch (error) {
    res.status = 400;
    res.send({ key: 'Failed to create item; please provide a name.' });
  }
};

module.exports = createItem;
