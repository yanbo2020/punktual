const router = require("express").Router();
const { studentCoursesCtrl, userCtrl, courseCtrl } = require("../controllers");
const { upload } = require("../helpers");

router
	.route("/v1/student-courses/student/:studentId")
	.get(studentCoursesCtrl.coursesByStudent)
	.post(studentCoursesCtrl.enroll);

// punch in
router
	.route("/v1/student-courses/students/:studentId/courses/:courseId/punch-in")
	.patch(
		studentCoursesCtrl.isEnrolled,
		upload.attendanceUpload,
		studentCoursesCtrl.verify,
		studentCoursesCtrl.punchIn
	);

// attendance records for a given student in a give course
router
	.route(
		"/v1/student-courses/students/:studentId/courses/:courseId/attendance-records"
	)
	.get(studentCoursesCtrl.isEnrolled, studentCoursesCtrl.attendanceRecords);

router.param("studentId", userCtrl.studentById);
router.param("courseId", courseCtrl.courseById);

module.exports = router;
