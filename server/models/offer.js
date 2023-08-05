
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define(
    'offer',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      price: {
        type: DataTypes.DECIMAL,
      },

      when: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
    }
  );

  Offer.associate = function (models) {
    Offer.belongsTo(models.item);
  };

  return Offer;
}
