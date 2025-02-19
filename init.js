const sequelize = require("./config/database");

const init = async () => {
  try {
    // إعادة إنشاء الجداول
    await sequelize.sync({ alter: true });

    console.log("✅ All tables have been created successfully!");
  } catch (error) {
    console.error("❌ Error initializing the database:", error);
  } finally {
    process.exit(0);
// إنهاء العملية
  }
};

init();
