const cron = require("node-cron");
const moment = require("moment-timezone");
const { Course, StudentCourse } = require("../models");

const getTodayClasses = async () => {
	const currentDay = moment().tz("Asia/Shanghai").format("dddd");
	const todayClasses = await Course.find({
		"time.day": currentDay,
	});
	return todayClasses;
};

const checkAbsentStudents = async (courses) => {
	console.log("Checking for absent students");
	try {
		// Find all student-course associations for the current course
		// without an attendance entry for the current day and mark them absent
		let today = moment().tz("Asia/Shanghai").format("YYYY-MM-DD");
		const absentees = [];
		for (const course of courses) {
			const absentStudents = await StudentCourse.find({
				course: course,
				"attendance.date": { $ne: today },
			})
				.populate("student")
				.populate("course");

			if (!absentStudents) {
				console.log("No absent students found");
				return;
			}
			for (const student of absentStudents) {
				// Push a new attendance entry with "Absent" status for the current day to each absent student
				student.attendance.push({
					date: today,
					status: "Absent",
				});
				// Save the update
				await student.save();
				// Push the student to the absentees array
				absentees.push(student);
			}
		}
		return absentees;
	} catch (err) {
		console.log("Failed to check for absent students ", err);
	}
};

const absentChecker = async () => {
	// Schedule a cron job to run everyday at 11:45 PM Shanghai time
	const task = cron.schedule(
		`45 23 * * *`,
		() => {
			console.log("Running cron job");
			// get all courses that are available on the current day
			getTodayClasses()
				.then((todayClasses) => {
					if (!todayClasses.length) {
						console.log("No classes today");
						return;
					}
					// find all absent students for each course and mark them absent
					checkAbsentStudents(todayClasses)
						.then((absentees) => {
							console.log(
								`Marked ${absentees.length} absent students`
							);
							// we could save the absentees to a database and send them an email here
						})
						.catch((err) => {
							console.log("Failed to mark absent students ", err);
						});
				})
				.catch((err) => {
					console.log("Failed to get today's classes ", err);
				});
		},
		{
			timezone: "Asia/Shanghai",
		}
	);
	// Start the cron job
	task.start();
};

module.exports = absentChecker;
