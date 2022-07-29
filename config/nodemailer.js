const nodemailer = require("nodemailer");
const ejs = require('ejs');
const Path = require('path');
const env = require('./environment')


let transporter = nodemailer.createTransport(env.smtp);

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