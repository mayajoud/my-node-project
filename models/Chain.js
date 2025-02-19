const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Project = require("./Project");
const Risk = require("./Risk");

const Chain = sequelize.define(
  "Chain",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chainName: {
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

// كل سلسلة مخاطر مرتبطة بمشروع معين
Chain.belongsTo(Project, { foreignKey: "projectId", as: "project" });
Project.hasMany(Chain, { foreignKey: "projectId", as: "chains" });

// كل سلسلة يمكن أن تحتوي على عدة مخاطر
Chain.hasMany(Risk, { foreignKey: "chainId", as: "alternativeRisksInChain" });

Risk.belongsTo(Chain, { foreignKey: "chainId", as: "chain" });

module.exports = Chain;
