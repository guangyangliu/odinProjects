const {Router} = require("express");
const router = Router();
const controller = require("../controllers/indexController");

router.get("/", controller.display);
router.get("/new",controller.newMessage);
router.post("/new", controller.submit);
router.get("/new/:index",controller.detail);

module.exports = router;