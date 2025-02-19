const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Stage = sequelize.define(
  "Stage",
  {
    stageName: {
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

module.exports = Stage;
