const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token_model');
const config = require('../config/config')

function generateTokens(payload){
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {expiresIn: config.JWT_EXPIRES_IN} );

    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {expiresIn: config.JWT_EXPIRES_IN_REFRESH} );

    return {
        accessToken,
        refreshToken
    }
}

async function saveToken(userId, refreshToken){
    try {
        const tokenData = await tokenModel.findOne({ where: { userId } });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        const token = await tokenModel.create({ userId, refreshToken });
        return token;
    } catch (error) {
        console.error('Помилка при збереженні токена:', error);
        throw error;
    }
}

async function removeToken(refreshToken){

    const tokenData = await tokenModel.deleteOne(refreshToken);

    return tokenData;
}

function validateAccessToken(token){
    try{
        const userData = jwt.verify(token, config.JWT_ACCESS_SECRET);
        return userData;
    }
    catch(err){
        return null;
    }
}

function validateRefreshToken(token){
    try{
        const userData = jwt.verify(token, config.JWT_REFRESH_SECRET);
        return userData;
    }
    catch(err){
        return null;
    }
}

async function findToken(refreshToken){

        const tokenData = await tokenModel.findOne({refreshToken});

        return tokenData;
}
module.exports = {
    generateTokens,
    saveToken,
    validateAccessToken,
    validateRefreshToken,
    removeToken,
    findToken

}