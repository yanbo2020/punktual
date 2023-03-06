export const studentActions = {
	RESTORE: "RESTORE",
	ENROLL: "ENROLL",
};

export const studentDataInitState = {
	courses: [],
	enrolledCourses: [],
	notifications: [],
};

export const studentDataReducer = (prevState, action) => {
	switch (action.type) {
		case studentActions.RESTORE:
			return {
				...prevState,
				courses: action.courses,
				enrolledCourses: action.enrolledCourses,
				notifications: action.notifications,
			};
		case studentActions.ENROLL:
			return {
				...prevState,
				enrolledCourses: [...prevState.enrolledCourses, action.course],
			};
		default:
			return prevState;
	}
};
