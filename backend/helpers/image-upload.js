import multer from 'multer';
import path from 'path';

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    console.log(req)

    if (req.baseUrl.includes('users')) {
      folder = "users";
    } else if (req.baseUrl.includes('diet')) {
      folder = "food";
    } else if (req.baseUrl.includes('training')) {
      folder = "training";
    }

    cb(null, `public/images/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|gif)$/i)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas imagens png, jpg ou gif!"));
    }
    cb(undefined, true);
  },
});

export { imageUpload };