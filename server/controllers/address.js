const db = require('../models/index');

async function createAddress (req, res) {
  const { itemId, lat, lng } = req.body;
  try {
    const createdAddress = await db.address.create({
      itemId,
      lat,
      lng,
    });
    res.status(201);
    res.send(createdAddress);
  } catch (error) {
    console.log('Failed to create address: ', error);
  }
};

module.exports = createAddress;