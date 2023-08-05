module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'address',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      lat: {
        type: DataTypes.FLOAT,
      },

      lng: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
    },
    {
      timestamps: false,
    }
  );

  Address.associate = function (models) {
    Address.belongsTo(models.item);
  };

  return Address;
}
