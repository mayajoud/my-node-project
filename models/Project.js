const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define(
  "Project",
  {
    projectCode: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      unique: true,
      validate: {
        len: [3, 20], // الحد الأدنى 3 والأقصى 20 حرفًا
      },
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    projectDescription: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false } // تعطيل createdAt و updatedAt إذا لم تكن ضرورية
);

module.exports = Project;
