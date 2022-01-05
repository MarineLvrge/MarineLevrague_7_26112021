const Comment = require ('../models/commentModel');
const User = require ('../models/userModel');

exports.createComment = (req, res, next) => {
    Comment.create({
        id_post: req.params.id_post,
        id_user: req.body.id_user,
        comment: req.body.comment
    })
    .then(() => res.status(201).json({ message: 'Commentaire publié!' }))
    .catch((error) => res.status(500).json({ error, message: 'Une erreur est survenue lors de la publication du commentaire' }));
};

exports.modifyComment = (req, res, next) => {
    Comment.update({
        comment: req.body.comment
    }, {
        where: {
            id_comment: req.params.id_comment
        }
    })
    .then(() => res.status(200).json({ message: 'Commentaire modifié avec succès!' }))
    .catch((error) => res.status(500).json({ error, message: 'Une erreur est survenue lors de la modification du commentaire' }));
};

exports.deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {
            id_comment: req.params.id_comment
        }
    })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé avec succès!' }))
    .catch((error) => res.status(500).json({ error, message: 'Une erreur est survenue lors de la suppression du commentaire!' }));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        where: {
            id_post: req.params.id_post
        },
        include: [{
            model: User,
            attributes: ['lastName', 'firstName', 'profilPicture']
        }],
        order: [['createdAt', 'ASC']]
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error, message: 'Une erreur est survenue lors de la récupération de tous les commentaires' }));
};