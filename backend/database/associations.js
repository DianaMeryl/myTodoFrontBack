const sequelize = require('./database');
const User = require('../models/users');
const Token = require('../models/token_model');
const Todo = require('../models/todo_model');

User.hasMany(Token, { foreignKey: 'userId' });
User.hasMany(Todo, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

(async () => {
    try {
        await sequelize.sync({ force: true }); 
        console.log('База даних та таблиці створені!');
    } catch (error) {
        console.error('Помилка синхронізації бази даних:', error);
    }
})();