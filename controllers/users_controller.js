
const User = require('../models/users');

module.exports.login = function(req, res){
    return res.render('login', {
        title : "HT | Login"
    });
}

module.exports.register = function(req, res){
    return res.render('register', {
        title : "HT | register"
    });
}

module.exports.createUser = function(req, res){

    if(req.password != req.password2){
        console.log("Password don't match");
        return;
    }

    User.create(req.body, function(err, user){
        if(err){
            console.log("Error while creating user", err);
            return;
        }
        console.log("User created !");
        res.redirect('/users/login');
    });

}

module.exports.createSession = function(req, res){
    // Todo later
    return res.redirect('/');
}