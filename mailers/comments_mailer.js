const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'me@muntazir.in',
        to: comment.user.email,
        subject: 'New Content Published!',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('errer sending mail', err);
            return;
        }

        console.log('Mail sent', info);
        return;
    });
}