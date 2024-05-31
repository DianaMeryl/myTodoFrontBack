const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Todo = sequelize.define('Todo', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    },
    todoText: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Todo;