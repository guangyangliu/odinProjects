const {Router} = require('express');
const router = Router();
const indexController = require('../controller/index');
const isLoggedIn = require('./authMiddleware').isLoggedIn;
const isMember = require('./authMiddleware').isMember;
const isAdmin = require('./authMiddleware').isAdmin;

router.get('/', indexController.homepage);

router.get('/signup', (req, res) => {
    res.render('signUp');
});

router.post('/signup', indexController.signupPost);

router.get('/join',isLoggedIn,indexController.joinGet);

router.post('/join', isLoggedIn, indexController.joinPost);

router.get('/login', indexController.loginGet);


router.post('/login', indexController.loginPost);

router.get('/post', isMember, (req, res) => {
    res.render('post');
});

router.post('/post', isMember, indexController.postPost);

router.get('/logout', indexController.logout);

router.get('/delete/:id', isAdmin, indexController.deleteMessage);

module.exports = router;