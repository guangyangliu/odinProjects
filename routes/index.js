const {Router} = require('express');
const router = Router();
const indexController = require('../controller/index');
const passport = require('passport');
const authenticate = require('./authMiddleware');

router.get('/', indexController.homepage);

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

router.post('/login', indexController.loginPost);

router.get('/post', authenticate.isLoggedIn, (req, res) => {
    res.render('post');
});

router.post('/post', authenticate.isLoggedIn, indexController.postPost);

router.get('/logout', indexController.logout);

module.exports = router;