const express = require ('express');
const router = express.Router();
const commentCtrl = require ('../controllers/commentCtrl');
const auth = require ('../middleware/auth');

router.post('/:id_post', auth, commentCtrl.createComment);
router.put('/:id_comment', auth, commentCtrl.modifyComment);
router.delete('/:id_comment', auth, commentCtrl.deleteComment);
router.get('/post/:id_post', auth, commentCtrl.getAllComments);

module.exports = router;