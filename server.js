const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// ✅ استخدمي المنفذ الذي توفره المنصة أو 5000 للتشغيل المحلي
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// ✅ تعديل مسار الملفات الثابتة ليكون داخل "public"
const publicPath = path.join(__dirname, "public");

console.log("🛠️ المسار الصحيح للملفات الثابتة:", publicPath);
app.use(express.static(publicPath));

// ✅ تعديل نقطة البداية لإرسال index.html من المجلد الصحيح
app.get("/", (req, res) => {
  const filePath = path.join(publicPath, "index.html");
  console.log("📄 محاولة إرسال الملف:", filePath);
  res.sendFile(filePath);
});

// ✅ استخدام المنفذ الديناميكي
app.listen(PORT, "0.0.0.0", () => {
 console.log(`🚀 Server running on port ${PORT}`);
});
