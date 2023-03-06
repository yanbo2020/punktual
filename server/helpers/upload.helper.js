const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		const student = req.student;
		cb(null, student._id + path.extname(file.originalname));
	},
});

const tempStorage = multer.memoryStorage();

const upload = multer({ storage: storage });
const attendanceUpload = multer({ storage: tempStorage }).single("image");

const getBase64 = (buffer) => {
	const imgData = Buffer.from(buffer).toString("base64");
	const prefix = "data:image/png;base64,";
	return prefix + imgData;
};

module.exports = { upload, attendanceUpload, getBase64 };
