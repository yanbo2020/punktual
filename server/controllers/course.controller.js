const { Course } = require("../models");
const { getErrorMessage } = require("../helpers");
const { extend } = require("lodash");

const create = async (req, res) => {
	try {
		const course = new Course(req.body);
		const newCourse = await course.save();
		const populatedCourse = await Course.findById(newCourse._id)
			.populate("instructor", "-password -__v")
			.populate({ path: "location", populate: { path: "building" } });
		res.status(201).json(populatedCourse);
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const getAll = async (req, res) => {
	try {
		const courses = await Course.find()
			.populate("instructor", "-password -__v")
			.populate({ path: "location", populate: { path: "building" } });
		res.status(200).json(courses);
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const courseById = async (req, res, next, id) => {
	try {
		const course = await Course.findById(id)
			.populate("instructor", "-password -__v")
			.populate({ path: "location", populate: { path: "building" } });
		if (!course) {
			return res.status(404).json({ error: "Course not found" });
		}
		req.course = course;
		next();
	} catch (err) {
		return res.status(400).json({ error: getErrorMessage(err) });
	}
};

const coursesByInstructor = async (req, res) => {
	try {
		const courses = await Course.find({ instructor: req.instructor._id })
			.populate("instructor", "-password -__v")
			.populate({ path: "location", populate: { path: "building" } });
		res.status(200).json(courses);
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const read = (req, res) => {
	return res.status(200).json(req.course);
};

const update = async (req, res) => {
	try {
		let course = req.course;
		course = extend(course, req.body);
		const updated = await course.save();
		res.status(200).json(updated);
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const remove = async (req, res) => {
	try {
		const course = req.course;
		await course.remove();
		res.status(200).json({ message: "Course deleted" });
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

module.exports = {
	create,
	getAll,
	courseById,
	coursesByInstructor,
	read,
	update,
	remove,
};
