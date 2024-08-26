const { Router } = require("express");
const router = Router();
const controller = require('../controller/index');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup',controller.signupPost);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', controller.loginPost);

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/login');
    }
  };

router.get('/upload', isLoggedIn, (req, res) => res.render('upload'));

router.post('/upload',controller.uploadPost);

router.get('/folder', controller.showFolders);

router.post('/folder', controller.createFolder);

router.get('/delete/:folderName', controller.deleteFolder);



router.get('/update/:folderName', controller.updateGet);
router.post('/update/:folderName', upload.single('file'), controller.updatePost);

module.exports = router;
