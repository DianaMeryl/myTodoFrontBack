const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Token = sequelize.define('Token', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Token;