const router = require("express").Router();
const { upload } = require("../helpers");
const { userCtrl } = require("../controllers");

router
	.route("/v1/students/:studentId/photo")
	.put(upload.upload.single("image"), userCtrl.saveImage)
	.get(userCtrl.getImage);

// update password

router
	.route("/v1/students/:studentId/password")
	.put(userCtrl.checkPassword, userCtrl.updateStudent);

router.param("studentId", userCtrl.studentById);

module.exports = router;
