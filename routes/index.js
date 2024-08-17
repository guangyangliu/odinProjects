const {Router} = require('express');
const router = Router();
const indexController = require('../controller/index');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/signup', (req, res) => {
    res.render('signUp');
});

router.post('/signup', indexController.signupPost);

router.get('/join', (req, res) => {
    res.render('join');
});

router.post('/join', indexController.joinPost);

module.exports = router;