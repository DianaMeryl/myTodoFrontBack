const TodoService = require('../services/todo_service');


async function addingTodoItem(req, res, next) {
    try {
        const { userId, todoText } = req.body;

        if (!userId || !todoText) {
            throw new Error('userId and todoText are required');
        }

        const todoData = await TodoService.saveTodo(userId, todoText);
        return res.json(todoData);
    } catch (err) {

        return res.status(500).json({ message: err.message });
    }
}

async function removeTodoItem(req, res, next) {
    try {
        const { id } = req.params;
        
        const todoData = await TodoService.removeTodo(id);

        return res.json(todoData);
    } catch (err) {
        next(err);
    }
}

async function findTodoItem(req, res, next) {
    try {
        const { todoText } = req.body;
        
        const todoData = await TodoService.findTodo(todoText);

        return res.json(todoData);

    } catch (err) {
        next(err);
    }
}

async function findAllTodoItems(req, res, next) {
    try {
        const userId = req.params.id;
   
        const todoData = await TodoService.getAllTodos(userId);

        return res.json(todoData);

    } catch (err) {
        next(err);
    }
}


module.exports = {
    addingTodoItem,
    removeTodoItem,
    findAllTodoItems,
    findTodoItem
};