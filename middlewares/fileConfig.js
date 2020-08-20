const multer = require('multer');
const fs = require('fs');

module.exports = {
    fileStorage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, 'uploads');
        },
        filename: (req, file, done) => {
            done(null, new Date().toISOString() + '-' + file.originalname);
        }
    }),
    fileFilter: (req, file, done) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            done(null, true);
        } else {
            done(null, false);
        }
    },
    imageUpload: (image) => {
        if (image) {
            if (image.mimetype === 'image/jpg' || image.mimetype === 'image/jpeg' || image.mimetype === 'image/png') return true;
        }
    },
    deleteImage: (imagepath)=>{
        fs.unlink(imagepath, (err) => {
            if(err) throw err;
        });
    }
}