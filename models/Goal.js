const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Goal = sequelize.define(
  "Goal",
  {
    goalName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 100], // الحد الأدنى 3 أحرف والأقصى 100 حرف
      },
    },
  },
  { timestamps: false } // تعطيل createdAt و updatedAt
);

module.exports = Goal;
