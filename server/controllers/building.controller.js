const { Building } = require("../models");
const { getErrorMessage } = require("../helpers");
const { extend } = require("lodash");

const create = async (req, res) => {
	try {
		const building = new Building(req.body);
		const newBuilding = await building.save();
		res.status(201).json(newBuilding);
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const getAll = async (req, res) => {
	try {
		const buildings = await Building.find().sort({ buildingNumber: 1 });
		res.status(200).json(buildings);
	} catch (err) {
		res.status(400).send({ error: getErrorMessage(err) });
	}
};

const buildingById = async (req, res, next, id) => {
	try {
		const building = await Building.findById(id);
		if (!building) {
			return res.status(404).json({ error: "Building not found" });
		}
		req.building = building;
		next();
	} catch (err) {
		return res.status(400).json({ error: getErrorMessage(err) });
	}
};

const read = (req, res) => {
	return res.status(200).json(req.building);
};

const update = async (req, res) => {
	try {
		let building = req.building;
		building = extend(building, req.body);
		const updated = await building.save();
		res.status(200).json(updated);
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

const remove = async (req, res) => {
	try {
		const building = req.building;
		await building.remove();
		res.status(200).json({ message: "Building deleted successfully" });
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

module.exports = { create, getAll, buildingById, read, update, remove };
