const sequelize = require("./config/database");

const Project = require("./models/Project");
const Risk = require("./models/Risk");
const Stage = require("./models/Stage");
const DefenseLayer = require("./models/DefenseLayer");
const Goal = require("./models/Goal");
const RiskLocation = require("./models/RiskLocation");
const Chain = require("./models/Chain");
const Relation = require("./models/Relation");

// العلاقات بين الجداول
Project.hasMany(Stage, { as: "stages" });
Stage.belongsTo(Project);

Stage.hasMany(DefenseLayer, { as: "defenseLayers" });
DefenseLayer.belongsTo(Stage);
Risk.belongsToMany(RiskLocation, {
  through: "Risk_RiskLocations",
  foreignKey: "riskId",
  otherKey: "riskLocationId",
});
RiskLocation.belongsToMany(Risk, {
  through: "Risk_RiskLocations",
  foreignKey: "riskLocationId",
  otherKey: "riskId",
});

Project.hasMany(Goal, { as: "goals" });
Goal.belongsTo(Project);

Risk.belongsToMany(RiskLocation, { through: "Risk_RiskLocations" });
RiskLocation.belongsToMany(Risk, { through: "Risk_RiskLocations" });
Risk.hasMany(Relation, { as: "relationsFrom", foreignKey: "fromRiskId" });
Risk.hasMany(Relation, { as: "relationsTo", foreignKey: "toRiskId" });

Chain.hasMany(Risk, { as: "secondaryRisksInChain" });

Risk.belongsTo(Chain);

Relation.belongsTo(Risk, { as: "fromRisk", foreignKey: "fromRiskId" });
Relation.belongsTo(Risk, { as: "toRisk", foreignKey: "toRiskId" });

module.exports = {
  sequelize,
  Project,
  Risk,
  Stage,
  DefenseLayer,
  Goal,
  RiskLocation,
  Chain,
  Relation,
};
