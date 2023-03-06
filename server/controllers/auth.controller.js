const jwt = require("jsonwebtoken");
const { expressjwt: expJwt } = require("express-jwt");
const { User, Notification } = require("../models");
const { getErrorMessage } = require("../helpers");

const errorMessage = "Invalid login credentials, please try again.";

const adminSignin = async (req, res) => {
	if (!req.body.email || !req.body.password)
		return res.status(401).json({ error: "Please fill in all fields" });
	try {
		let admin = await User.findOne({
			email: req.body.email,
			role: "Admin",
		});
		if (!admin) return res.status(401).json({ error: errorMessage });

		const authenticated = await admin.authenticate(req.body.password);
		if (!authenticated) {
			return res.status(401).json({ error: errorMessage });
		}

		const token = jwt.sign(
			{ _id: admin._id, role: admin.role },
			process.env.JWT_TOKEN_SECRET
		);
		return res.status(200).json({
			token,
			admin: {
				_id: admin._id,
				firstName: admin.firstName,
				lastName: admin.lastName,
				email: admin.email,
			},
		});
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.json({ error: `Failed to login ${getErrorMessage(err)}` });
	}
};

const requireSignin = expJwt({
	secret: process.env.JWT_TOKEN_SECRET,
	algorithms: ["HS256"],
	userProperty: "adauth",
});

const isAdmin = (req, res, next) => {
	// The req.auth object is attached by express-jwt in requireSignin.
	// isAdmin is the boolean value passed when the token was signed in adminSignin.
	const authorized = req.auth && req.auth.role === "Admin";
	if (!authorized) {
		return res.status(403).json({
			error: "Authorization failed. Only the Admin is Authorized to perform this action.",
		});
	}
	next();
};

const userSignin = async (req, res) => {
	if ((!req.body.email && !req.body.idNumber) || !req.body.password)
		return res.status(401).json({ error: "Please fill in all fields" });
	try {
		let user = await User.findOne({
			$or: [{ email: req.body.email }, { idNumber: req.body.idNumber }],
			role: { $ne: "Admin" },
		});

		if (!user) return res.status(401).json({ error: errorMessage });

		const authenticated = await user.authenticate(req.body.password);
		if (!authenticated) {
			return res.status(401).json({ error: errorMessage });
		}

		const token = jwt.sign(
			{ _id: user._id, role: user.role },
			process.env.JWT_TOKEN_SECRET
		);
		user.password = undefined;
		return res.status(200).json({
			token,
			user,
		});
	} catch (err) {
		return res
			.status(400)
			.json({ error: `Authentication failed ${getErrorMessage(err)}` });
	}
};

const dashboardData = async (req, res) => {
	const students = await User.find({ role: "Student" })
		.select("-password")
		.exec();
	const teachers = await User.find({ role: "Teacher" })
		.select("-password")
		.exec();
	const admins = await User.find({ role: "Admin" })
		.select("-password")
		.exec();
	const recentNotifications = await Notification.find({})
		.sort({ createdAt: -1 })
		.limit(5)
		.exec();

	Promise.all([students, teachers, admins, recentNotifications])
		.then(([students, teachers, admins, recentNotifications]) => {
			const data = {
				students: students.length,
				teachers: teachers.length,
				admins: admins.length,
				recentNotifications,
			};
			return res.status(200).json(data);
		})
		.catch((err) => {
			return res.status(400).json({
				error: `Failed to fetch data ${getErrorMessage(err)}`,
			});
		});
};

module.exports = {
	adminSignin,
	requireSignin,
	isAdmin,
	userSignin,
	dashboardData,
};
