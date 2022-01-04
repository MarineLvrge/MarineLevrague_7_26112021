const express = require ('express');
const { like } = require('sequelize/dist/lib/operators');
const router = express.Router();
const likeCtrl = require ('../controllers/likeCtrl');

router.post('/:id_post', likeCtrl.createLike);
router.post('/read/:id_post', likeCtrl.readLike);
router.get('/count/:id_post', likeCtrl.countLike);

module.exports = router;