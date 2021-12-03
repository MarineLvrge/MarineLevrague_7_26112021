const sequelize = require ('../config/sequelize');
const { Sequelize, DataTypes } = require ('sequelize');

const Like = sequelize.define('Like', {
    id_user: {
        type: DataTypes.UUID,
        allowNull: false
    },
    id_post: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = Like;