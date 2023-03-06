const { extend } = require("lodash");
const fs = require("fs");
const path = require("path");
const { User } = require("../models");
const { getErrorMessage } = require("../helpers");

const createStudent = async (req, res) => {
	const student = new User(req.body);
	student.role = "Student";
	student.password = "000000"; // default password

	try {
		const saved = await student.save();
		return res.status(200).json(saved);
	} catch (err) {
		return res.status(400).json({ error: getErrorMessage(err) });
	}
};

const createInstructor = async (req, res) => {
	const teacher = new User(req.body);
	teacher.role = "Teacher";
	teacher.password = "000000"; // default password

	try {
		const saved = await teacher.save();
		return res.status(200).json(saved);
	} catch (err) {
		return res.status(400).json({ error: getErrorMessage(err) });
	}
};

const createAdmin = async (req, res) => {
	const admin = new User(req.body);
	admin.role = "Admin";
	admin.password = "000000"; // default password

	try {
		const saved = await admin.save();
		return res.status(200).json(saved);
	} catch (err) {
		return res.status(400).json({ error: getErrorMessage(err) });
	}
};

const listStudents = async (req, res) => {
	try {
		const students = await User.find({ role: "Student" }).select(
			"-password -__v"
		);
		return res.status(200).json(students);
	} catch (err) {
		return res.status(400).json({ error: getErrorMessage(err) });
	}
};

const listInstructors = async (req, res) => {
	try {
		const instructors = await User.find({ role: "Teacher" }).select(
			"-password -__v"
		);
		return res.status(200).json(instructors);
	} catch (err) {
		return res.status(400).json({ error: getErrorMessage(err) });
	}
};

const listAdmins = async (req, res) => {
	try {
		const admins = await User.find({ role: "Admin" }).select(
			"-password -__v"
		);
		return res.status(200).json(admins);
	} catch (err) {
		return res.status(400).json({ error: getErrorMessage(err) });
	}
};

// update a User
const updateAdmin = async (req, res) => {
	try {
		let user = req.profile;

		user = extend(user, req.body);
		await user.save();
		return res.status(200).json({ message: "User information updated" });
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error: "Failed to update user information " + getErrorMessage(err),
		});
	}
};

// delete User account
const removeAdmin = async (req, res) => {
	try {
		const user = req.profile;
		await user.remove();
		return res.status(200).json({ message: "User account deleted" });
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error: "Failed to delete User account " + getErrorMessage(err),
		});
	}
};

const userById = async (req, res, next, id) => {
	try {
		let user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				error: "User profile information not found",
			});
		}
		req.profile = user;
		next();
	} catch (err) {
		return res.status(500).json({
			error: getErrorMessage(err),
		});
	}
};

const studentById = async (req, res, next, id) => {
	try {
		let student = await User.findOne({ _id: id, role: "Student" });
		if (!student) {
			return res.status(404).json({
				error: "Student profile information not found",
			});
		}
		req.student = student;
		next();
	} catch (err) {
		return res.status(500).json({
			error: getErrorMessage(err),
		});
	}
};

// check student password before update

const checkPassword = async (req, res, next) => {
	try {
		const student = req.student;
		const { oldPass } = req.body;
		const authenticated = await student.authenticate(oldPass);
		if (!authenticated) {
			return res.status(400).json({
				error: "Old Password is incorrect",
			});
		}
		next();
	} catch (err) {
		return res.status(400).json({
			error: getErrorMessage(err),
		});
	}
};

// read student profile

const readStudent = (req, res) => {
	req.student.password = undefined;
	return res.status(200).json(req.student);
};

// delete Student account

const removeStudent = async (req, res) => {
	try {
		const student = req.student;
		await student.remove();
		return res.status(200).json({ message: "Student account deleted" });
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error: "Failed to delete Student account " + getErrorMessage(err),
		});
	}
};

// update student profile

const updateStudent = async (req, res) => {
	try {
		let student = req.student;
		student = extend(student, req.body);
		await student.save();
		return res.status(200).json({ message: "Student information updated" });
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error:
				"Failed to update student information " + getErrorMessage(err),
		});
	}
};

// save image
const saveImage = async (req, res) => {
	try {
		let student = req.student;
		student.image = req.file.filename;
		const saved = await student.save();
		saved.password = undefined;
		return res.status(200).json(saved);
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error: "Failed to upload image " + getErrorMessage(err),
		});
	}
};

// get image
const getImage = async (req, res) => {
	try {
		const student = req.student;
		const studentImage = fs.readFileSync(
			path.join(__dirname, "../uploads", student.image)
		);
		const base64Image = Buffer.from(studentImage).toString("base64");
		const imageUri = `data:image/png;base64,${base64Image}`;
		return res.status(200).send(imageUri);
	} catch (err) {
		res.status(400).json({
			error: "Failed to get image " + getErrorMessage(err),
		});
	}
};

const instructorById = async (req, res, next, id) => {
	try {
		let instructor = await User.findOne({
			_id: id,
			role: "Teacher",
		});
		if (!instructor) {
			return res.status(404).json({
				error: "Instructor profile information not found",
			});
		}
		req.instructor = instructor;
		next();
	} catch (err) {
		return res.status(500).json({
			error: getErrorMessage(err),
		});
	}
};

// read instructor profile

const readInstructor = (req, res) => {
	req.instructor.password = undefined;
	return res.status(200).json(req.instructor);
};

// check instructor password before update

const checkInstructorPassword = async (req, res, next) => {
	try {
		const instructor = req.instructor;
		const { oldPass } = req.body;
		const authenticated = await instructor.authenticate(oldPass);
		if (!authenticated) {
			return res.status(400).json({
				error: "Old Password is incorrect",
			});
		}
		next();
	} catch (err) {
		return res.status(400).json({
			error: getErrorMessage(err),
		});
	}
};

// delete Instructor account

const removeInstructor = async (req, res) => {
	try {
		const instructor = req.instructor;
		await instructor.remove();
		return res.status(200).json({ message: "Instructor account deleted" });
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error:
				"Failed to delete Instructor account " + getErrorMessage(err),
		});
	}
};

// update instructor profile

const updateInstructor = async (req, res) => {
	try {
		let instructor = req.instructor;
		instructor = extend(instructor, req.body);
		const updated = await instructor.save();
		return res.status(200).json(updated);
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error:
				"Failed to update instructor information " +
				getErrorMessage(err),
		});
	}
};

module.exports = {
	createStudent,
	createInstructor,
	createAdmin,
	listStudents,
	listInstructors,
	listAdmins,
	updateAdmin,
	removeAdmin,
	userById,
	studentById,
	checkPassword,
	readStudent,
	removeStudent,
	updateStudent,
	saveImage,
	getImage,
	instructorById,
	readInstructor,
	checkInstructorPassword,
	removeInstructor,
	updateInstructor,
};
