const ApiError = require('../exceptions/api_error');

function errorHandler(err, req, res, next) {
    console.error('Error: ', err); // Додайте логування помилок
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
