const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT ,
    secure: false,
    auth: {
        user: config.SMTP_USER ,
        pass: config.SMTP_PASSWORD 
    }
});

async function sendActivationMail(to, link){
    await transporter.sendMail({
        from: config.SMTP_USER,
        to: to,
        subject: "Активація акаунта на" + config.API_URL,
        text:"",
        html: `
        <div> 
            <h1>Для активації перейдіть по ссилці:</h1>
            <a href="${link}">${link}</a>
        </div>
        `
    })
}

module.exports = {
    sendActivationMail
}