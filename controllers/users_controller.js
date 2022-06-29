const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('profile',{
                    title: "User Profile",
                    user: user
                });
            } else {
                return res.redirect('/users/sign-in');
            }
        });
    } else {
        return res.redirect('/users/sign-in');
    }
}

//render signup
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "User Sign Up"
    })
}

//render signin
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "User Sign in"
    })
}

// get signup data
module.exports.create = function(req,res){
        if (req.body.password != req.body.confirm_password){
            console.log('password not match');
            return res.redirect('back');
        }
        
        User.findOne({email: req.body.email}, function(err, user){
            if(err){
                console.log('error in finding user')
                return;
            }

            if(!user){
                User.create(req.body, function(err, user){
                    if(err){
                        console.log('Cannot create user : '+ err)
                    }

                    return res.redirect('users/sign-in');
                });
            } else {
                return res.redirect('back');
            }
        } )
    }


// get signin data
module.exports.createSession = function(req,res){
        // find the user
        User.findOne({email: req.body.email}, function(err,user){
            if(err){
                console.log('error in finding user')
                return;
            }
            // handle user found
            if(user){
                // handle passords which don't match
                if(user.password != req.body.password){
                    return res.redirect('back');
                }
                // handle session creation
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile')

            } else {
                // handle user not found
                return res.redirect('back');
            }
        }) 
    }

module.exports.signOut = function(req,res){
    res.cookie('user_id', '');
    return res.redirect('back')
}