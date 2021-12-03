const sequelize = require ('../config/sequelize');
const { Sequelize, DataTypes } = require ('sequelize');

const Post = sequelize.define('Post', {
    id_post: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    id_user: {
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    attachment: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Post;