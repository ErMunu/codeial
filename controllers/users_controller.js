module.exports.profile = function(req,res){
    return res.render('profile',{
        title: "My Profile"
    })
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
    //todo later
    }


// get signin data
module.exports.createSession = function(req,res){
    //todo later
    }