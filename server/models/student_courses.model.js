const mongoose = require("mongoose");
const moment = require("moment-timezone");

const StudentCourseSchema = new mongoose.Schema({
	student: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	course: {
		type: mongoose.Schema.ObjectId,
		ref: "Course",
		required: true,
	},
	attendance: [
		{
			date: {
				type: String,
				default: moment().tz("Asia/Shanghai").format("YYYY-MM-DD"),
			},
			status: {
				type: String,
				enum: ["Present", "Absent", "Leave"],
				default: "Present",
			},
		},
	],
});

const StudentCourseModel = new mongoose.model(
	"StudentCourse",
	StudentCourseSchema
);

module.exports = StudentCourseModel;
