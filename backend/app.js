const express = require ('express');
const sequelize = require ('./config/sequelize');
const path = require ('path');


// Routes
const userRoutes = require ('./routes/userRouter');
const postRoutes = require ('./routes/postRouter');
const likeRoutes = require ('./routes/likeRouter');
const commentRoutes = require ('./routes/commentRouter');

// Framework express de NodeJS
const app = express();

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());


// Middlewares

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use ('/api/like', likeRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;