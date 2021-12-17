const express = require ('express');
const sequelize = require ('./config/sequelize');
const path = require ('path');
const cors = require('cors');

// Synchronisation des tables
//const dbComment = require ('./models/commentModel');
//const dbLike = require ('./models/likeModel');
//const dbPost = require ('./models/postModel');
//const dbUser = require ('./models/userModel');

// Routes
const userRoutes = require ('./routes/userRouter');
const authMiddleware = require ('./middleware/auth');
//const postRoutes = require ('./routes/postRouter');
//const likeRoutes = require ('./routes/likeRouter');
//const commentRoutes = require ('./routes/commentRouter');

// Framework express de NodeJS
const app = express();

// Autorisation des CORS (Cross Origin Resource Sharing) permet à toutes les demandes de toutes les origines d'accéder à l'API
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    optionSuccessStatus: '200',
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  };

  app.use(cors(corsOptions));

app.use(express.json());


// Middlewares

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
//app.use('/api/posts', postRoutes);
//app.use ('/api/like', likeRoutes);
//app.use('/api/comments', commentRoutes);

module.exports = app;