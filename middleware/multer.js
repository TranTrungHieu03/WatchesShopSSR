const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadsDir);
    },
    filename(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } });

module.exports= upload;
