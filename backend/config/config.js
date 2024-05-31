require('dotenv').config();

// App config
const SERVER_PORT = +process.env.SERVER_PORT || 3000;
const API_PREFIX = process.env.API_PREFIX;
const NODE_ENV = process.env.NODE_ENV || 'dev';

// DB config
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

// JWT config
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_EXPIRES_IN_REFRESH = process.env.JWT_EXPIRES_IN_REFRESH;

// 
const HASH_SALT  = process.env.HASH_SALT;

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const CLIENT_URL = process.env.CLIENT_URL;
const API_URL =  process.env.API_URL;

module.exports = {
  SERVER_PORT,
  API_PREFIX,
  NODE_ENV,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER_NAME,
  DB_PASSWORD,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN,
  JWT_EXPIRES_IN_REFRESH,
  HASH_SALT,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASSWORD,
  CLIENT_URL,
  API_URL,
};
