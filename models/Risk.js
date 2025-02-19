const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Risk = sequelize.define(
  "Risk",
  {
    riskCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    riskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    focusOfImpact: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    suddenness: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    frequency: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    effectiveness: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0, max: 1 },
    },
    rfh: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
  },
  { timestamps: false } // تعطيل createdAt و updatedAt
);

module.exports = Risk;
