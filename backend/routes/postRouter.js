const express = require ('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const postCtrl = require ('../controllers/postCtrl');
const multer = require ('../middleware/multer');

router.post('/', auth, multer.posts, postCtrl.createPost);
router.put('/:id_post', auth, multer.posts, postCtrl.modifyPost);
router.delete('/:id_post', auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id_post', auth, postCtrl.getOnePost);

module.exports = router;
