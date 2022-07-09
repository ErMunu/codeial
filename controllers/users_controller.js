const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {

    User.findById(req.params.id, function (err, user) {
        return res.render('profile', {
            title: 'User Profile',
            profile_user: user
        })
    })
}

module.exports.update = async function (req, res) {
   
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('Multer Error: ', err);
                }
                
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {

        req.flash('err', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }

}

//render signup
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('profile', {
            title: 'User Profile'
        })
    }

    return res.render('user_sign_up', {
        title: "User Sign Up"
    })
}

//render signin
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('profile', {
            title: 'User Profile'
        })
    }

    return res.render('user_sign_in', {
        title: "User Sign in"
    })
}

// get signup data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('password not match');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user')
            return;
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('Cannot create user : ' + err)
                }

                return res.redirect('users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    })
}


// get signin data
module.exports.createSession = function (req, res) {
    // find the user
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }

        req.flash('success', 'Logged out successfully');

        res.redirect('/');
    });
}