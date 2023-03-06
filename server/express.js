const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const {
	adminRoutes,
	authRoutes,
	studentCoursesRoutes,
	courseRoutes,
	notificationRoutes,
	instructorRoutes,
	studentRoutes,
} = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

app.use("/", adminRoutes);
app.use("/", authRoutes);
app.use("/", studentCoursesRoutes);
app.use("/", courseRoutes);
app.use("/", notificationRoutes);
app.use("/", instructorRoutes);
app.use("/", studentRoutes);

app.get("/", (req, res) => res.send("hello there"));

/* Handle auth-related errors thrown by express-jwt when it tries to validate JWT
tokens in incoming requests */
app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(401).json({ error: err.name + ": " + err.message });
	} else if (err) {
		res.status(400).json({ error: err.name + ": " + err.message });
	}
});

module.exports = app;
