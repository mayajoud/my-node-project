const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DefenseLayer = sequelize.define(
  "DefenseLayer",
  {
    layerName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50], // الحد الأدنى 3 أحرف والأقصى 50 حرف
      },
    },
  },
  { timestamps: false } // تعطيل createdAt و updatedAt
);

module.exports = DefenseLayer;
