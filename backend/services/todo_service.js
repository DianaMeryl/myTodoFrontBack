const Todo = require('../models/todo_model');

async function saveTodo(userId, todoText) {
    try {
        if (!userId || !todoText) {
            throw new Error('userId and todoText are required');
        }

        const todoData = await Todo.create({ userId, todoText });

        return todoData;

    } catch (error) {

        console.error('Помилка при збереженні нотатки:', error.message);
        throw error;
    }
}


async function removeTodo(id){
    try {
        const todoData = await Todo.destroy({
            where: { id }
        });

        if (!todoData) {
            throw new Error('Todo not found');
        }

        return { message: 'Todo successfully deleted' };
    } catch (error) {
        console.error('Помилка при видаленні нотатки:', error.message);
        throw error;
    }
}

async function findTodo(todoText){

        const todoData = await Todo.findOne({todoText});

        return todoData;
}

async function getAllTodos(userId){
    try {
        const todos = await Todo.findAll({
            where: {
                userId: userId
            }
        });
        return todos;
    } catch (error) {
        
        console.error('Помилка при отриманні завдань:', error);
        throw error;
    }
}

async function updateTodo(id, todo) {

    await Todo.update(todo, { where: { id: id } });

}

module.exports = {
    saveTodo,
    removeTodo,
    findTodo,
    getAllTodos, 
    updateTodo
}