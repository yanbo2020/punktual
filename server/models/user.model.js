const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	idNumber: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	college: {
		type: String,
		trim: true,
	},
	major: {
		type: String,
		trim: true,
	},
	class: {
		type: String,
		trim: true,
	},
	role: {
		type: String,
		enum: ["Student", "Teacher", "Admin"],
		default: "Student",
		required: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
	image: {
		type: String,
	},
});

// Hash the password
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		return next();
	} catch (err) {
		console.log(err);
	}
});

// authenticate user
UserSchema.methods.authenticate = async function (plainText) {
	return await bcrypt.compare(plainText, this.password);
};

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;
