
module.exports = (sequelize, DataTypes) => {
    const Bus = sequelize.define("Bus", {
      busNumber: DataTypes.STRING,
      totalSeats: DataTypes.INTEGER,
      availableSeats: DataTypes.INTEGER,
    });
  
    Bus.associate = (models) => {
      Bus.hasMany(models.Booking, { foreignKey: "busId" });
    };
  
    return Bus;
  };
  