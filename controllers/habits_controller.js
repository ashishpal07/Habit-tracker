
const mongoose = require('mongoose');
const Habit = require('../models/habits');
const User = require('../models/users');

const month = ['Jan', 'Fed', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


// create new habit
module.exports.createHabit = async function(req, res){
    
    

    // check if user is 
    let user = await User.findById(req.user.id);

    if(user){

        let today = new Date();
        let date = today.getDate();

        let habit = await Habit.create({
            content : req.body.habit,
            date_creation : date,
            days : ['None', 'None', 'None', 'None', 'None', 'None', 'None'],
            user : user.id,
            completed : 0,
            streak : 0,
        });
        console.log('habit created');
        user.habits.push(habit.id);
        user.save();
        return res.redirect('back');

    }else{
        console.log("User not find so you can not create habit");
        return;
    }

}


// delete habit
module.exports.deleteHabit = async function(req, res){
    
    let id = req.params.id;

    // check if habit is exist
    let habit = await Habit.findById(id);
    
    if(habit){
        let user_id = habit.user;
        habit.remove();

        // now delete habit id from user habits array
        await User.findByIdAndUpdate(user_id, { $pull : { habits : id } });
        console.log('habit deleted');
        return res.redirect('/users/dashboard');
    }else{
        console.log('Not deleted');
        return res.redirect('/users/dashboard');
    }
    

}


// get all habit on dashboard
// module.exports.showHabit = function(req, user){
//     Habit.find({user : req.user.id}, function(err, users){
//         if(err){
//             console.log('while user finding for showing');
//             return;
//         }
//         return res.render('dashboard', {
//             title : "Dashboard",
//             users : users,
//         });
//     });
// }
