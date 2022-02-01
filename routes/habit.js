
const express = require('express');
const router = express.Router();
const passport = require('passport');

const habitsController = require('../controllers/habits_controller');

router.post('/create', habitsController.createHabit);
router.get('/delete/:id', habitsController.deleteHabit);


module.exports = router;