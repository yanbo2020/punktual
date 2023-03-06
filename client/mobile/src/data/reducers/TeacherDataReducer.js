export const teacherActions = {
	RESTORE: "RESTORE",
};

export const teacherDataInitialState = {
	courses: [],
};

export const teacherDataReducer = (prevState, action) => {
	switch (action.type) {
		case teacherActions.RESTORE:
			return {
				...prevState,
				courses: action.courses,
			};
		default:
			return prevState;
	}
};
