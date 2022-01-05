const express = require ('express');
const { like } = require('sequelize/dist/lib/operators');
const router = express.Router();
const likeCtrl = require ('../controllers/likeCtrl');
const auth = require ('../middleware/auth');

router.post('/:id_post', auth, likeCtrl.createLike);
router.post('/read/:id_post', auth, likeCtrl.readLike);
router.get('/count/:id_post', auth, likeCtrl.countLike);

module.exports = router;