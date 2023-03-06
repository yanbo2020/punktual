const { Notification } = require("../models");
const { getErrorMessage } = require("../helpers");

const create = async (req, res) => {
	try {
		const notification = new Notification(req.body);
		const saved = await notification.save();
		res.status(201).json(saved);
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const getAll = async (req, res) => {
	try {
		const notification = await Notification.find();
		res.status(200).json(notification);
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

module.exports = { create, getAll };
