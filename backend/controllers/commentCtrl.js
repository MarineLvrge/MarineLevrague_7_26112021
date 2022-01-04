const Comment = require ('../models/commentModel');

exports.createComment = (req, res, next) => {
    Comment.create({
        id_post: req.params.id_post,
        id_user: req.body.id_user,
        comment: req.body.comment
    })
    .then(() => res.status(201).json({ message: 'Commentaire publié!' }))
    .catch((error) => res.status(500).json({ message: 'Une erreur est survenue lors de la publication du commentaire' }));
};

exports.modifyComment = (req, res, next) => {

}

exports.deleteComment = (req, res, next) => {

}

exports.getAllComments = (req, res, next) => {
    
}