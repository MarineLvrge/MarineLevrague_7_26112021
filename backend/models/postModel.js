const sequelize = require ('../config/sequelize');
const { Sequelize, DataTypes } = require ('sequelize');
const Like = require('./likeModel');

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
}, {

});

Post.hasMany(Comment, {
    foreignKey: 'id_post',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(Post, { foreignKey: 'id_post' })

Post.hasMany(Like, {
    foreignKey: 'id_post',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(Post, { foreignKey: 'id_post' })

module.exports = Post;