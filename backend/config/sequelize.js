const { Sequelize } = require ('sequelize');
const dotenv = require ('dotenv');
dotenv.config({path: './config/.env'});

const configDB = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

const sequelize = new Sequelize (configDB.name, configDB.user, configDB.password, {
    host: configDB.host,
    dialect: 'mysql'
});

// Connexion à la DB
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Synchronisation des modèles avec la DB
sequelize.sync()
  .then(() => {
    console.log('Synchronized to Database');
})
.catch(err => {
  console.error('Echec de la synchronisation:', err);
});


module.exports = sequelize;