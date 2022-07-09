const nodemailer = require("nodemailer");
const ejs = require('ejs');
const dotenv = require('dotenv');
const Path = require('path');
dotenv.config();


let transporter = nodemailer.createTransport({
    service: 'hostinger',
    host: 'smtp.hostinger.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.emailUserName,
        pass: process.env.emailPassword
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        Path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log('error rendering template')
                return;
            }

            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}