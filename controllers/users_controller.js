
const User = require('../models/users');
const Habit = require('../models/habits');

module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        req.flash('success', "Logout first");
        return res.render('dashboard', {
            title : "HT | Dashboard"
        });
    }else{
        return res.render('login', {
            title : 'HT | Login'
        });
    }
}


module.exports.register = function(req, res){
    if(req.isAuthenticated()){
        req.flash('success', "Logout first");
        return res.render('dashboard', {
            title : "HT | Dashboard"
        });
    }else{
        return res.render('register', {
            title : 'HT | register'
        });
    }
}




module.exports.destroySession = function(req, res){
    req.logout();

    req.flash('success', 'Logged out Successfully');
    return res.redirect('/');
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
    req.flash('success', 'Log In Successfully')
    return res.redirect('/habits/dashboard');
}