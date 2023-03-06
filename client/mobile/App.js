import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useMemo, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import {
	AuthContext,
	StudentDataContext,
	TeacherDataContext,
} from "./src/data/context";
import {
	authReducer,
	authInitialState,
	AUTH_ACTIONS,
} from "./src/data/reducers/AuthReducer";
import {
	studentDataReducer,
	studentDataInitialState,
} from "./src/data/reducers/StudentDataReducer";
import {
	teacherDataReducer,
	teacherDataInitialState,
} from "./src/data/reducers/TeacherDataReducer";
import AuthNav from "./src/screens/auth/AuthNav";
import StudentRootNav from "./src/screens/student/StudentRootNav";
import TeacherRootNav from "./src/screens/teacher/TeacherRootNav";

export default function App() {
	const [authState, authDispatch] = useReducer(authReducer, authInitialState);
	const [studentDataState, studentDataDispatch] = useReducer(
		studentDataReducer,
		studentDataInitialState
	);
	const [teacherDataState, teacherDataDispatch] = useReducer(
		teacherDataReducer,
		teacherDataInitialState
	);

	useEffect(() => {
		async function loadApp() {
			try {
				const auth = await AsyncStorage.getItem("auth");

				authDispatch({
					type: AUTH_ACTIONS.RESTORE,
					auth: JSON.parse(auth),
				});
			} catch (err) {
				console.log(err);
			}
		}
		loadApp();
	}, []);

	const authContextValue = useMemo(() => {
		return { authState, authDispatch };
	}, [authState, authDispatch]);

	const studentDataContextValue = useMemo(() => {
		return { studentDataState, studentDataDispatch };
	}, [studentDataState, studentDataDispatch]);

	const teacherDataContextValue = useMemo(() => {
		return { teacherDataState, teacherDataDispatch };
	}, [teacherDataState, teacherDataDispatch]);

	return (
		<AuthContext.Provider value={authContextValue}>
			<StudentDataContext.Provider value={studentDataContextValue}>
				<TeacherDataContext.Provider value={teacherDataContextValue}>
					<SafeAreaProvider>
						<NavigationContainer>
							{!authState?.auth ? (
								<AuthNav />
							) : (
								<>
									{authState?.auth.user.role == "Student" ? (
										<StudentRootNav />
									) : (
										<TeacherRootNav />
									)}
								</>
							)}
							<StatusBar style="light" />
						</NavigationContainer>
					</SafeAreaProvider>
				</TeacherDataContext.Provider>
			</StudentDataContext.Provider>
		</AuthContext.Provider>
	);
}
