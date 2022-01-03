const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, 'images');
    },
    filename: (req, file, callback) => {
    let fileSplit = file.originalname.split(' ').join('_');
    fileSplit = fileSplit.split('.');
    fileSplit.pop();
    fileSplit = fileSplit.join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, fileSplit + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');