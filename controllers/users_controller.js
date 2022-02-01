
const User = require('../models/users');

module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        console.log("can not go to the login you have to logged out first");
        return res.render('dashboard', {
            title : "HT | Dashboard"
        });
    }
    return res.render('login', {
        title : 'HT | Login'
    });
}





module.exports.register = function(req, res){
    if(req.isAuthenticated()){
        console.log("can not go to the register you have to logged out first");
        return res.render('dashboard', {
            title : "HT | Dashboard"
        });
    }
    return res.render('register', {
        title : 'HT | register'
    });
}





module.exports.dashboard = function(req, res){
    if(req.isAuthenticated()){
        return res.render('dashboard', {
            title : "HT | Dashboard"
        });
    }
    return res.render('login', {
        title : "HT | Login"
    });
}




module.exports.destroySession = function(req, res){
    req.logout();
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
    return res.redirect('/users/dashboard');
}