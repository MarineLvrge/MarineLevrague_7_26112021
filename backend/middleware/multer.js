// On récupère le package multer pour gérer les fichiers entrants
const multer = require ('multer');
const path = require ('path');

// On indique les fichiers acceptés
const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpeg',
    'images/png': 'png',
    'images/gif': 'gif',
    'images/webp': 'webp'
};

const filesAccepted = (req, res, next) => {
    if(MIME_TYPES.includes(file.mimetype)) {
        callback(null, true);
    } else {
        return callback(new Error('Les formats acceptés sont: jpg, jpeg, png, gif et webp'), false);
    }
}

const storagePosts = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/posts') // On indique à multer dans quel dossier sauvegarder les fichiers
    },
    filename: (req, file, callback) => {
        const name = Date.now() + '_' + Math.floor(Math.random()*10000);
        const extension = path.extname(file.originalname);
        callback(null, name + extension);
    }
});

const storageProfilePictures = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/profilePictures') // On indique à multer dans quel dossier sauvegarder les fichiers
    },
    filename: (req, file, callback) => {
        const name = Date.now() + '_' + Math.floor(Math.random()*10000);
        const extension = path.extname(file.originalname);
        callback(null, name + extension);
    }
});

// On exporte multer en lui indiquant que nous gérerons uniquement les téléchargements de fichiers image
module.exports = multer({filesAccepted, storage: storagePosts }).single('image');
module.exports = multer({filesAccepted, storage: storageProfilePictures }).single('image');