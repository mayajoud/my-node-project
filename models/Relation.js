const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Relation = sequelize.define(
  "Relation",
  {
    fromRiskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Risks", key: "id" },
      unique: "relation_pair",
    },
    toRiskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Risks", key: "id" },
      unique: "relation_pair",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["fromRiskId", "toRiskId"],
      },
    ],
  }
);

module.exports = Relation;
