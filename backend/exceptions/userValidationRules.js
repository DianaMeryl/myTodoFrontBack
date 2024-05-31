const { body } = require('express-validator');

const userValidationRules = () => {
    return [
        body('name').isString().withMessage('Name - має бути в текстовому форматі'),
        body('email').isEmail().withMessage('Email is invalid.'),
        body('password').isLength({ min: 3, max: 32 }).withMessage('Password - кількість символів в межах від 3 до 32')
    ];
};

module.exports =  { userValidationRules };