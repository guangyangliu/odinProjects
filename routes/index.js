const {Router} = require('express');
const router = Router();
const indexController = require('../controller/index');
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/signup', (req, res) => {
    res.render('signUp');
});

router.post('/signup', indexController.signupPost);

router.get('/join/:username',indexController.joinGet);

router.post('/join/:username', indexController.joinPost);

router.get('/login', (req, res, next) => {
    console.log('login get');
    res.render('login');
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'}));

module.exports = router;