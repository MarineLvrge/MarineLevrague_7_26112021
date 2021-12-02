const { Sequelize } = require ('sequelize');
const dotenv = require ('dotenv');
dotenv.config({path: './config/.env'})

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

module.exports = sequelize;