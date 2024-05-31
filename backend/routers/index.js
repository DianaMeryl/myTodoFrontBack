const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const todoController = require('../controllers/todo_controler');
const { userValidationRules } = require('../exceptions/userValidationRules');
const authMiddleware = require('../middlewares/auth_middleware');


router.post('/registration', userValidationRules(), userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.post('/addtodo', todoController.addingTodoItem);
router.get('/alltodos/:id', todoController.findAllTodoItems);
router.delete('/remove/:id', todoController.removeTodoItem);
module.exports = router;