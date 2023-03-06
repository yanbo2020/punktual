const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		text: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

const NotificationModel = new mongoose.model(
	"Notification",
	NotificationSchema
);

module.exports = NotificationModel;
