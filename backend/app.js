// const sequelizeAss = require('./database/associations'); 
const sequelize = require('./database/database'); 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routers');
const errorHandler = require('./middlewares/error_middlewares');
const config = require('./config/config');

const PORT = config.SERVER_PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(config.API_PREFIX, router);

app.use(errorHandler); // завжди має бути останнім серед use




sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log('Unable to connect to the database:', error);
});