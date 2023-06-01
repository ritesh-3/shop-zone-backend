const multer = require("multer");
const fs = require('fs');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        const folderFath = path.join(__dirname, 'uploads');
        cb(null, folderFath);

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split(".")[0];
        cb(null, filename + "-" + uniqueSuffix + ".png");
    },
});

exports.upload = multer({ storage: storage });