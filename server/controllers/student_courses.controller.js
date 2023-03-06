const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { StudentCourse } = require("../models");
const { getErrorMessage } = require("../helpers");
const { getBase64 } = require("../helpers/upload.helper");

const enroll = async (req, res) => {
	const { course } = req.body;
	const student = req.student._id;

	// Check if student is already enrolled in the course
	const isEnrolled = await StudentCourse.findOne({ student, course });
	if (isEnrolled) {
		return res
			.status(400)
			.json({ error: "Student already enrolled in the course" });
	}

	try {
		const studentCourse = await StudentCourse.create({ student, course });
		res.status(201).json({
			studentCourse,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const coursesByStudent = async (req, res) => {
	const student = req.student._id;
	try {
		const studentCourses = await StudentCourse.find({ student })
			.select("course")
			.populate({
				path: "course",
				populate: { path: "instructor", select: "-password -__v" },
			})
			.populate({
				path: "course",
				populate: { path: "location", populate: { path: "building" } },
			});
		const courses = studentCourses.map(
			(studentCourse) => studentCourse.course
		);
		res.status(200).json(courses);
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const studentsByCourse = async (req, res) => {
	const course = req.course._id;
	try {
		const studentCourses = await StudentCourse.find({ course })
			.select("student")
			.populate({ path: "student", select: "-password -__v" });
		const students = studentCourses.map(
			(studentCourse) => studentCourse.student
		);
		res.status(200).json(students);
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const recordsByCourse = async (req, res) => {
	const course = req.course._id;
	let records = [];
	try {
		const studentCourses = await StudentCourse.find({ course })
			.select("student attendance")
			.populate({ path: "student", select: "-password -__v" });
		studentCourses.map((studentCourse) => {
			let record = {
				student: studentCourse.student,
				attendance: studentCourse.attendance,
			};
			records.push(record);
		});
		res.status(200).json(records);
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const isEnrolled = async (req, res, next) => {
	const course = req.course._id;
	const student = req.student._id;

	try {
		const studentCourse = await StudentCourse.findOne({ student, course });
		if (!studentCourse) {
			return res
				.status(400)
				.json({ error: "Student is not enrolled in the course" });
		}
		req.enrolledCourse = studentCourse;
		next();
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const verify = async (req, res, next) => {
	const { enrolledCourse } = req;

	// Check if student has already punched in today

	let today = moment().tz("Asia/Shanghai").format("YYYY-MM-DD");

	let attendanceItem = enrolledCourse.attendance.find((item) => {
		return item.date === today;
	});

	if (attendanceItem) {
		return res
			.status(400)
			.json({ error: "Student has already punched in today" });
	}

	if (!req.file) {
		return res
			.status(400)
			.json({ error: "The image is required for verification" });
	}

	try {
		const userImage = fs.readFileSync(
			path.join(__dirname, "../uploads", req.student.image)
		);
		const punchInEncoded = getBase64(req.file.buffer);
		const userImageEncoded = getBase64(userImage);

		const data = {
			img1_path: userImageEncoded,
			img2_path: punchInEncoded,
			model_name: "Facenet",
			detector_backend: "mtcnn",
			distance_metric: "euclidean",
		};

		const response = await axios.post(process.env.VERIFIER_URL, data);

		if (response.data.verified === "True") {
			req.today = today;
			next();
		} else {
			return res.status(400).json({
				error: "The face could not be verified, please try again.",
			});
		}
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const punchIn = async (req, res) => {
	const { enrolledCourse, today } = req;

	try {
		console.log("Punch in success" + today);

		enrolledCourse.attendance.push({
			date: today,
			status: "Present",
		});
		const saved = await enrolledCourse.save();
		res.status(200).json(saved);
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const attendanceRecords = async (req, res) => {
	const { enrolledCourse } = req;
	res.status(200).json(enrolledCourse.attendance);
};

module.exports = {
	enroll,
	coursesByStudent,
	studentsByCourse,
	recordsByCourse,
	isEnrolled,
	verify,
	punchIn,
	attendanceRecords,
};
