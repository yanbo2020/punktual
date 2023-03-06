const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
	buildingNumber: {
		type: Number,
		required: true,
		unique: true,
		min: 1,
		max: 35,
	},
	coordinates: {
		lat: {
			type: Number,
			required: true,
		},
		lng: {
			type: Number,
			required: true,
		},
	},
});

module.exports = new mongoose.model("Building", BuildingSchema);
