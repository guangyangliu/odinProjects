const {Router} = require('express');
const router = new Router();
const controller = require("../controller/index");

router.get('/', controller.getCategory);
router.get('/category', controller.getCategory);
router.get('/category/:type', controller.getCarName);

router.get('/create/category', controller.createCategoryGet);
router.post('/create/category', controller.createCategoryPost);

router.get('/create/model', controller.createModelGet);
router.post('/create/model', controller.createModelPost);

router.get('/update');
router.get('/delete');


module.exports = router;