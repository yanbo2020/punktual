require("dotenv").config();
const server = require("./express");
const mongoose = require("mongoose");
const absentChecker = require("./helpers/absent_checker.helper");

const PORT = process.env.PORT || 5000;

// connect to the database
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Database connection successful"))
	.catch((err) => console.error("Failed to connect to the database", err));

server.listen(PORT, () => {
	// Start the cron job to check for absent students
	absentChecker()
		.then(() => {
			console.log("Cron job started");
		})
		.catch((err) => {
			console.log("Failed to start cron job", err);
		});
	console.log(`Server running on port ${PORT}`);
});
