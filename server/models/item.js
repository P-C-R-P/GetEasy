module.exports = (sequelize, DataTypes) => {

  const Item = sequelize.define(
    'item',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.FLOAT,
      }
    },
    {
      timestamps: false,
    }
  );

  Item.associate = function (models) {
    Item.hasMany(models.offer);
    Item.hasMany(models.address);
    Item.belongsTo(models.user);
  };

  return Item;
}
