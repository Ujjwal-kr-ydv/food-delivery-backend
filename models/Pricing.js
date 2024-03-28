const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Pricing = sequelize.define('Pricing', {
  organization_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  base_distance_in_km: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  km_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fix_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Pricing;
