const userCtrl = require("./user.controller");
const authCtrl = require("./auth.controller");
const buildingCtrl = require("./building.controller");
const courseCtrl = require("./course.controller");
const notificationCtrl = require("./notification.controller");
const studentCoursesCtrl = require("./student_courses.controller");

module.exports = {
	userCtrl,
	authCtrl,
	buildingCtrl,
	courseCtrl,
	notificationCtrl,
	studentCoursesCtrl,
};
