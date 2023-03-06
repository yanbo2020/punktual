const router = require("express").Router();
const { courseCtrl, userCtrl, studentCoursesCtrl } = require("../controllers");

router
	.route("/v1/instructors/:instructorId/courses")
	.get(courseCtrl.coursesByInstructor);

// update instructor's password
router
	.route("/v1/instructors/:instructorId/password")
	.put(userCtrl.checkInstructorPassword, userCtrl.updateInstructor);

// students enrolled in a course by instructor
router
	.route("/v1/instructors/:instructorId/courses/:courseId/students")
	.get(studentCoursesCtrl.studentsByCourse);

// attendance for a course by instructor
router
	.route("/v1/instructors/:instructorId/courses/:courseId/records")
	.get(studentCoursesCtrl.recordsByCourse);

router.route;

router.param("instructorId", userCtrl.instructorById);
router.param("courseId", courseCtrl.courseById);

module.exports = router;
