const express = require("express");
const path = require("path");
const app = express();

// استخدم المنفذ الذي توفره المنصة أو 5000 للتشغيل المحلي
const PORT = process.env.PORT || 3306;

// تحديد المسار الصحيح للملفات الثابتة
const publicPath = path.join(__dirname, "public");

// تأكد من أن المسار الذي يضع فيه الملفات الثابتة صحيح
console.log("🛠️ المسار الصحيح للملفات الثابتة:", publicPath);
app.use(express.static(publicPath));

// إرسال index.html عند الوصول إلى الجذر
app.get("/", (req, res) => {
  const filePath = path.join(publicPath, "index.html");
  console.log("📄 محاولة إرسال الملف:", filePath);
  res.sendFile(filePath);
});

// تشغيل السيرفر
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
