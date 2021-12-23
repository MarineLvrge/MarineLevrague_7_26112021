const Post = require ('../models/postModel');
const fs = require ('fs');
const jwt = require ('jsonwebtoken');
const User = require ('../models/userModel');
require ('dotenv').config({path: '../config/.env'});

// Création d'une publication
exports.createPost = (req, res, next) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        attachment: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
        id_user: req.body.id_user
    })
    .then(() => res.status(201).json({ message: 'Publication créée avec succès' }))
    .catch((error) => res.status(500).json({ error, message: 'Une erreur est survenue lors de la création de la publication' }));
};

// Modification d'une publication
exports.modifyPost = (req, res, next) => {
    if(req.file) {
        Post.findByPk(req.params.id_post)
        .then(post => {
            if(post.attachment) {
                const filename = post.attachment.split('/images/posts/')[1];
                fs.unlink(`images/posts/${filename}`, () => {console.log('Fichier supprimé')});
            }
        })
        .catch(error => res.status(400).json({ error, message: 'Ce fichier n\'a pas pu être supprimé' }));
    };
    const post = req.file ? {
        title: req.body.title,
        content: req.body.content,
        attachment: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    } : {
        title: req.body.title,
        content: req.body.content
    };

    Post.update(post,
       {
            where: {
                id_post: req.params.id_post
            }
    })
    .then(() => res.status(200).json({ message: 'Publication modifiée avec succès' }))
    .catch((error) => res.status(500).json({ error, message: 'Une erreur est survenue lors de la modification de la publication' }));
};


// Suppression d'une publication
exports.deletePost = (req, res, next) => {
        Post.findByPk(req.params.id_post)
        .then(post => {
            if(post.attachment) {
                const filename = post.attachment.split('/images/posts/')[1];
                fs.unlink(`images/posts/${filename}`, () => {console.log('Fichier supprimé')});
            }
        })
        .catch(error => res.status(400).json({ error, message: 'Ce fichier n\'a pas pu être supprimé' }));

    Post.destroy(
        {
        where: {
            id_post: req.params.id_post
        }
    })
    .then(() => res.status(200).json({ message: 'Publication supprimée avec succès' }))
    .catch((error) => res.status(500).json({ error, message: 'Une erreur est survenue lors de la suppression de cette publication' }));
};

// Récupération de toutes les publications
exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        include: [{
            model: User,
            attributes: ['id_user', 'firstName', 'lastName', 'profilPicture']
        }],
        order: [['createdAt', 'DESC']]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error, message: 'Une erreur est survenue lors de la récupération de toutes les publications' }));
};

// Récupération d'une publication
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: {
            id_post: req.params.id_post
        },
        include: [{
            model: User,
            attributes: ['id_user', 'firstName', 'lastName', 'profilPicture']
        }]
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error, message: 'Une erreur est survenue lors de la récupération de cette publication' }));
};