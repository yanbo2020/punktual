export const AUTH_ACTIONS = {
	RESTORE: "RESTORE",
	SIGNIN: "SIGNIN",
	SIGNOUT: "SIGNOUT",
	UPDATEPROFILE: "UPDATEPROFILE",
};

export const authInitialState = {
	auth: null,
};

export const authReducer = (prevState, action) => {
	switch (action.type) {
		case AUTH_ACTIONS.RESTORE:
			return {
				...prevState,
				auth: action.auth,
			};

		case AUTH_ACTIONS.SIGNIN:
			return {
				...prevState,
				auth: action.auth,
			};
		case AUTH_ACTIONS.SIGNOUT:
			return {
				...prevState,
				auth: null,
			};
		case AUTH_ACTIONS.UPDATEPROFILE:
			return {
				...prevState,
				auth: {
					...prevState.auth,
					user: {
						...prevState.auth.user,
						...action.user,
					},
				},
			};
	}
};
