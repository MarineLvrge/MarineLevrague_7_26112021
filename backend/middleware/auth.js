// On appelle la fonction des gestion des tokens
const jwt = require ('jsonwebtoken');
const dotenv = require ('dotenv');

// On vérifie que l'authentification est valide
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // On récupère le token dans le header de la requête
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); // On décode le token grâce à sa clé d'encodage
        const userId = decodedToken.userId; // On récupère l'ID de l'utilisateur dans le token décodé
        if(req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next(); // On vérifie que l'ID du token corresponde au token récupéré dans le header de la requête
        }
    } catch(error) {
        res.status(401).json({ error: error | 'Requête non authentifiée!' });
    }
};