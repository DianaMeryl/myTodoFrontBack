const User = require('../models/users');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail_service');
const tokenService = require('./token_service');
const config = require('../config/config');
const ApiError = require('../exceptions/api_error');
const UserDto = require('../dtos/user_dto');


async function registration(name, email, password) {

  const candidate = await User.findOne({
      where: { email }
  });
  
  if (candidate) {
      throw ApiError.BadRequest('Користувач з таким іменем вже існує!');
  }

  const hashPassword = await bcrypt.hash(password, 3);
  const activationLink = uuid.v4();

  const user = await User.create({ 
      name, 
      email, 
      password: hashPassword, 
      activationLink 
  });

  await mailService.sendActivationMail(email, `${config.API_URL}/api/activate/${activationLink}`);

  const userDto = new UserDto(user);
  
  const tokens = tokenService.generateTokens({ ...userDto });

    try {

      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      console.log('Токен успішно збережено');
      
  } catch (error) {
      console.error('Помилка при збереженні токена:', error);
  }


  return {
      ...tokens,
      user: userDto
  };
}

async function activate(activationLink) {

  const user = await User.findOne({ activationLink });
  if(!user){
    throw ApiError.BadRequest('Некоректне посилання!')
  }
  user.isActiveted = true;
  await user.save();
}

async function login(email, password) {

  const user = await User.findOne({ where: { email: email } });

  if(!user){
    throw ApiError.BadRequest('Користувача з такими даними не знайдено!')
  }
  const isPassequals = await bcrypt.compare(password, user.password);

  if(!isPassequals){
    throw ApiError.BadRequest('Невірний пароль!');
  }
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({...userDto});

  await tokenService.saveToken(userDto.id, tokens.refreshToken)
      return {...tokens, user: userDto}
}

async function logout(refreshToken) {

  const token = await tokenService.remove(refreshToken);

      return token;
}

async function refresh(refreshToken) {

  if(!refreshToken){
    throw ApiError.UnauthorizedError();
  }

  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDb = await tokenService.findToken(refreshToken);
  
  if(!userData || !tokenFromDb){
    throw ApiError.UnauthorizedError();
  }
  const user = await User.findById(userData.id);
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({...userDto});
  await tokenService.saveToken(userDto.id, tokens.refreshToken)
  return {...tokens, user: userDto}
}

async function getAllUsers() {

  const users = await User.findAll();

  return users;
}

  module.exports = {
    registration,
    activate,
    logout,
    login,
    refresh,
    getAllUsers
  }