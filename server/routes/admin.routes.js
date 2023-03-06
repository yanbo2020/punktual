const router = require("express").Router();
const {
	userCtrl,
	authCtrl,
	buildingCtrl,
	courseCtrl,
	notificationCtrl,
} = require("../controllers");

router.route("/v1/admin/login").post(authCtrl.adminSignin);

//dashboard data
router
	.route("/v1/admin/dashboard")
	.get(authCtrl.requireSignin, authCtrl.dashboardData);

router
	.route("/v1/admin/students")
	.get(authCtrl.requireSignin, userCtrl.listStudents)
	.post(authCtrl.requireSignin, userCtrl.createStudent);

router
	.route("/v1/admin/students/:studentId")
	.get(authCtrl.requireSignin, userCtrl.readStudent)
	.delete(authCtrl.requireSignin, userCtrl.removeStudent)
	.put(authCtrl.requireSignin, userCtrl.updateStudent);

router
	.route("/v1/admin/teachers")
	.get(authCtrl.requireSignin, userCtrl.listInstructors)
	.post(authCtrl.requireSignin, userCtrl.createInstructor);

router
	.route("/v1/admin/teachers/:teacherId")
	.get(authCtrl.requireSignin, userCtrl.readInstructor)
	.put(authCtrl.requireSignin, userCtrl.updateInstructor)
	.delete(authCtrl.requireSignin, userCtrl.removeInstructor);

router
	.route("/v1/admin/admins")
	.get(authCtrl.requireSignin, userCtrl.listAdmins)
	.post(authCtrl.requireSignin, userCtrl.createAdmin);

router
	.route("/v1/admin/buildings")
	.get(authCtrl.requireSignin, buildingCtrl.getAll)
	.post(authCtrl.requireSignin, buildingCtrl.create);

router
	.route("/v1/admin/buildings/:buildingId")
	.get(authCtrl.requireSignin, buildingCtrl.read)
	.put(authCtrl.requireSignin, buildingCtrl.update)
	.delete(authCtrl.requireSignin, buildingCtrl.remove);

router
	.route("/v1/admin/courses")
	.get(authCtrl.requireSignin, courseCtrl.getAll)
	.post(authCtrl.requireSignin, courseCtrl.create);

router
	.route("/v1/admin/courses/:courseId")
	.get(authCtrl.requireSignin, courseCtrl.read)
	.put(authCtrl.requireSignin, courseCtrl.update)
	.delete(authCtrl.requireSignin, courseCtrl.remove);

router
	.route("/v1/admin/notifications")
	.get(authCtrl.requireSignin, notificationCtrl.getAll)
	.post(authCtrl.requireSignin, notificationCtrl.create);

router
	.route("/v1/admin/admins/:userId")
	.put(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.updateAdmin)
	.delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.removeAdmin);

router.param("userId", userCtrl.userById);
router.param("studentId", userCtrl.studentById);
router.param("teacherId", userCtrl.instructorById);
router.param("courseId", courseCtrl.courseById);
router.param("buildingId", buildingCtrl.buildingById);

module.exports = router;
