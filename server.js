const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ❌ كان الخطأ هنا بوضع "public" غير ضرورية
const publicPath = __dirname;

console.log("🛠️ المسار الصحيح للملفات الثابتة:", publicPath);
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  const filePath = path.join(publicPath, "index.html");
  console.log("📄 محاولة إرسال الملف:", filePath);
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على: http://localhost:${PORT}`);
});
