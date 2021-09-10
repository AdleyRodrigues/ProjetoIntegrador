const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
var path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const name = uuidv4() + path.extname(file.originalname);
        cb(null, name);
        file.originalname = name;
    }
});

module.exports = multer({ storage });