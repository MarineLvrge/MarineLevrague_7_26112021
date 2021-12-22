const express = require ('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const userCtrl = require ('../controllers/userCtrl');
const multer = require ('../middleware/multer');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/accounts/:id_user', auth, userCtrl.getOneAccount);
router.put('/accounts/:id_user', auth, multer, userCtrl.modifyAccount);
router.delete('/accounts/:id_user', auth, userCtrl.deleteAccount);

module.exports = router;