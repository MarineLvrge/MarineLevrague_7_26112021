const sequelize = require ('../config/sequelize');
const { Sequelize, DataTypes } = require ('sequelize');
const Post = require('./postModel');
const Like = require('./likeModel');
const Comment = require ('./commentModel');

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    service: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {

});

User.hasMany(Post, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Post.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Like, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Like.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Comment, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(User, { foreignKey: 'id_user' });

module.exports = User;