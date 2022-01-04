const postLike = require ('../models/likeModel'); // Les copiers/collers c'est mal

exports.createLike = (req, res, next) => { // Les copiers/collers c'est mal
    const like = req.body.like;
    console.log(like);
    if (like == 1) {
        postLike.create({
            id_post: req.params.id_post,
            id_user: req.body.id_user
        })
        .then(() => res.status(201).json({ message: 'Like' }))
        .catch((error) => res.status(500).json({ error, message: 'Erreur like' }));   
    } else {
        postLike.destroy({
            where: {
                id_post: req.params.id_post,
                id_user: req.body.id_user
            }
        })
        .then(() => res.status(201).json({ message: 'Unlike' }))
        .catch((error) => res.status(500).json({ error, message: 'Erreur unlike' })); 
    }
}

exports.readLike = (req, res, next) => { // Les copiers/collers c'est mal
    postLike.findOne({
        where: {
            id_post: req.params.id_post,
            id_user: req.body.id_user
        }
    })
    .then(liked => {
        console.log(liked);
        let like = 0;
        if(liked != null) {
            like = 1
        }
        res.status(200).json({like})})
    .catch((error) => res.status(500).json({ error, message: 'Erreur est-ce que c\'est liké?'}));
}

exports.countLike = (req, res, next) => { // Les copiers/collers c'est mal
    postLike.count({
        where: {
            id_post: req.params.id_post
        }
      })
      .then(totalLikes => {
        res.status(200).json({totalLikes});
      })
      .catch((error) => res.status(500).json({ error, message: 'Erreur dans le comptage'}));
}