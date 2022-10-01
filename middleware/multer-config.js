const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/svg+xml': 'svg'
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => callback(null, file.fieldname === 'profile_image' ? 'images/profiles' : 'images/posts'),
	filename: (req, file, callback) => {
		const name = file.originalname.split(' ').join('_');
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + Date.now() + '.' + extension);
	},
});

module.exports = multer({ storage });
