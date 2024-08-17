const {Router} = require('express');
const router = Router();
const indexController = require('../controller/index');

router.get('/', (req, res) => {
    res.render('signUp');
});


router.post('/signup', indexController.signup);

module.exports = router;