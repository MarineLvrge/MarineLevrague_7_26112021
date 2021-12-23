const express = require ('express');
const router = express.Router();
const likeCtrl = require ('../controllers/likeCtrl');

router.post('/like/:id_post', likeCtrl.likePost);