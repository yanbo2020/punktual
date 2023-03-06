const router = require("express").Router();
const { courseCtrl } = require("../controllers");

router.route("/v1/courses").get(courseCtrl.getAll);

module.exports = router;
