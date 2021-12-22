const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const fs = require ('fs');
const dotenv = require ('dotenv');
const User = require ('../models/userModel');

// Création d'un utilisateur
exports.signup = (req, res, next) => {
    let profilPictureDefault = `${req.protocol}://${req.get('host')}/images/profilePictures/profilpic.webp`;
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                bio: '...',
                profilPicture: profilPictureDefault,
                isAdmin: false,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Permet à un utilisateur de s'identifier
exports.login = (req, res, next) => {

    User.findOne({ where: {email: req.body.email }})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            if (user === null) {
                return res.status(401).json({ error: 'Utilisateur ou mot de passe incorrect' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({ 
                        userId: user.id_user,
                        token: jwt.sign(
                            { userId: user.id_user, isAdmin: user.isAdmin },
                            `${process.env.SECRET_TOKEN}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Afficher un compte
exports.getOneAccount = (req, res, next) => {
    User.findOne({
        where: { id_user: req.params.id_user },
        attributes: { exclude: ['email', 'password']},
    })
    .then( user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
};

// Modifier un compte
exports.modifyAccount = (req, res, next) => {
    if(req.file) {
        User.findByPk(req.params.id_user)
        .then(user => {
            if(user.profilPicture) {
                const filename = user.profilPicture.split('/images/profilePictures/')[1];
                fs.unlink(`images/profilePictures/${filename}`, () => {console.log('Fichier image supprimé')});
            }   
        })
        .catch(error => res.status(400).json({ error }));
};

const user = req.file ? {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    profilPicture: `${req.protocol}://${req.get('host')}/images/profilePictures/${req.file.filename}`
} : {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio
};

User.update(user, 
    {
        where: {
            id_user: req.params.id_user
        }
    })
.then(() => res.status(200).json({ message: 'Ce compte a bien été modifié' }))
.catch((error)=> res.status(500).json({ message: 'Une erreur est survenue dans la modification du compte' }));

};

// Supprimer un compte
exports.deleteAccount = (req, res, next) => {
    User.destroy({
        where: {
            id_user: req.params.id_user
        }
    })
    .then(() => res.status(200).json({ message: 'Ce compte a bien été supprimé' }))
    .catch((error) => res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de ce compte'}));
};