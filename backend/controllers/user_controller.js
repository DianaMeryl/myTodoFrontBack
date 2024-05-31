const config = require('../config/config');
const UserService = require('../services/user_service');
const ApiError = require('../exceptions/api_error');
const { validationResult } = require('express-validator');
const Users  = require('../models/users');

async function registration(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Помилка при валідації', errors.array());
        }

        const { name, email, password } = req.body;
        
        const userData = await UserService.registration(name, email, password);

        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, 
            httpOnly: true
        });

        return res.json(userData);
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Помилка при валідації', errors.array());
        }

        const { email, password } = req.body;

        const userData = await UserService.login(email, password);

        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'Strict'
        });

        return res.json(userData);
    } catch (err) {
        next(err);
    }
}

async function logout(req, res, next) {
    try {
        const { refreshToken } = req.cookies;

        const token = await UserService.logout(refreshToken);

        res.clearCookie('refreshToken');

        return res.json(token);
    } catch (err) {
        next(err);
    }
}

async function activate(req, res, next) {
    try {
        const activationLink = req.params.link;
        await UserService.activate(activationLink);
        return res.redirect(config.CLIENT_URL);
    } catch (err) {
        next(err);
    }
}

async function refresh(req, res, next) {
    try {
        const { refreshToken } = req.cookies;

        const userData = await UserService.refresh(refreshToken);

        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, 
            httpOnly: true
        });

        return res.json(userData);
    } catch (err) {
        next(err);
    }
}

async function getUsers(req, res, next) {
    try {
        const users = await UserService.getAllUsers();
        return res.json(users);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registration,
    login,
    logout,
    activate,
    refresh,
    getUsers
};