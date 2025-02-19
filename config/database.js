const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // اسم قاعدة البيانات
  process.env.DB_USER, // اسم المستخدم
  process.env.DB_PASSWORD, // كلمة المرور
  {
    host: "localhost", // عنوان الخادم
    dialect: "mysql", // نوع قاعدة البيانات
    port: process.env.DB_PORT || 3306, // رقم المنفذ
    logging: false,
  }
);

module.exports = sequelize;
sequelize
  .authenticate()
  .then(() => console.log("✅ تم الاتصال بقاعدة البيانات بنجاح!"))
  .catch((err) => console.error("❌ فشل الاتصال بقاعدة البيانات:", err));
