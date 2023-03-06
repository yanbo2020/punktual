const router = require("express").Router();
const { notificationCtrl } = require("../controllers");

router.route("/v1/notifications").get(notificationCtrl.getAll);

module.exports = router;
