const express = require ('express');
const sequelize = require ('./config/sequelize');
//const path = require ('path');


// Routes

// Connexion à la DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Framework express de NodeJS
const app = express();

// Autorisation des CORS (Cross Origin Resource Sharing) permet à toutes les demandes de toutes les origines d'accéder à l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

//app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use('/api/auth', usersRoutes);
//app.use('/api/posts', postsRoutes);
//app.use('/api/comments', commentsRoutes);

module.exports = app;