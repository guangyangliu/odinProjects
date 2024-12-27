const { Router } = require("express");
const router = Router();
const controller = require('../controller/index');
const upload = require('../config/multer').upload;


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


router.get('/upload/:folderName?', isLoggedIn, controller.uploadGet);

router.post('/upload/:folderName?',upload.single('file'),controller.uploadPost);

router.get('/folder', controller.showFolders);
router.get('/', controller.showFolders);

router.post('/folder', controller.createFolder);

router.get('/delete/:folderName', controller.deleteFolder);

router.get('/folder/:folderName', controller.showFiles);
router.get('/update/:folderName', controller.updateGet);
router.post('/update/:folderName', controller.updatePost);


router.get('/download/:fileId', controller.downloadFile);

module.exports = router;
