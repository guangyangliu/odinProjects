const {Router} = require('express');
const router = new Router();
const controller = require("../controller/index");

router.get('/', controller.homeGet);

router.get('/create', controller.createGet);
router.post('/create/category', controller.createCategoryPost);
router.post('/create/model', controller.createModelPost);

router.get('/detail/:name', controller.detailGet);


/*





router.get('/category', controller.getCategory);
router.get('/category/:type', controller.getCarName);



router.get('/update');
router.get('/delete');
*/


module.exports = router;