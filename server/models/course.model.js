const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	instructor: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
		trim: true,
	},
	period: {
		year: String,
		semester: String,
	},
	time: {
		day: String,
		startTime: String,
		endTime: String,
	},
	location: {
		building: {
			type: mongoose.Schema.ObjectId,
			ref: "Building",
			required: true,
		},
		room: {
			type: String,
			required: true,
			trim: true,
		},
	},
});

const CourseModel = new mongoose.model("Course", CourseSchema);

module.exports = CourseModel;
