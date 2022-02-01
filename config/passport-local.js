
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email, password, done) {
        // find the user and stablish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("Error in finding user in passport setup");
                return done(err); 
            }
            if (!user || user.password != password) { 
                console.log("Invalid username / password");
                return done(null, false); 
            }
            
            return done(null, user);
        });
    }
));
  

// serializing user to decide what is in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key into the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("Error while finding user in deseralizing");
            return done(err);
        }
        return done(null, user);
    });
});

module.exports = passport;