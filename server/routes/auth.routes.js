const router = require("express").Router();
const { authCtrl } = require("../controllers");

router.route("/v1/auth/login").post(authCtrl.userSignin);

module.exports = router;
