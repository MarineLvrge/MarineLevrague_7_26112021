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

const storageProfilPicture = multer.diskStorage({
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
module.exports = multer({ storage: storagePosts }).single('image');
module.exports = multer({ storage: storageProfilPicture }).single('image');