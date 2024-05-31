const sequelize = require('../database/database')
const { DataTypes } = require('sequelize');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    activationLink: {
        type: DataTypes.STRING
    },
    },   { 
        tableName: 'users' 
    }
);

module.exports = Users;