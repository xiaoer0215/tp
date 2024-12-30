const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use('/uploads', express.static('uploads')); // 提供静态文件访问
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 使用时间戳命名文件
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({ url: `http://localhost:${PORT}/uploads/${req.file.filename}` });
    } else {
        res.status(400).send('上传失败');
    }
});

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
