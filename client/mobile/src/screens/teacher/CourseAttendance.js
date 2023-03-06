import React, { useContext, useState } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
	Text,
} from "react-native";
import { Header as HeaderRNE } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useEffect } from "react";
import { AuthContext } from "../../data/context";
import axios from "../../axios/axios";
import Loader from "../../components/Loader";
import { Divider, Overlay } from "@rneui/base";
import NoData from "../../components/NoData";

const CourseAttendance = ({ navigation, route }) => {
	const { authState } = useContext(AuthContext);
	const [allRecords, setAllRecords] = useState([]);
	const [currentRecords, setCurrentRecords] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dates, setDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const teacher = authState?.auth?.user;

	const course = route.params.course;

	useEffect(() => {
		async function fetchRecords() {
			setLoading(true);
			try {
				const response = await axios.get(
					`/v1/instructors/${teacher?._id}/courses/${course?._id}/records`
				);
				setLoading(false);
				const { data } = response;
				setAllRecords(data);
				const distinctDates = [
					...new Set(
						data
							.map((record) =>
								record.attendance.map((a) => a.date)
							)
							.flat()
					),
				];
				setDates(distinctDates);
				setSelectedDate(
					distinctDates[distinctDates.length - 1] || null
				);

				distinctDates.length &&
					setCurrentRecords(
						filterByDate(
							data,
							distinctDates[distinctDates.length - 1]
						)
					);
			} catch (err) {
				setLoading(false);
				console.error(err);
			}
		}
		fetchRecords();
	}, [course._id, teacher._id]);

	const filterByDate = (data, date) => {
		return data.filter((record) =>
			record.attendance.some((attendance) => attendance.date === date)
		);
	};

	const onDateSelected = (date) => {
		setSelectedDate(date);
		setCurrentRecords(filterByDate(allRecords, date));
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<SafeAreaProvider style={{ backgroundColor: COLORS.blue }}>
			<Loader visible={loading} />
			<HeaderRNE
				containerStyle={styles.headerContainer}
				leftComponent={
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}
					>
						<Ionicons
							name="ios-arrow-back-circle-sharp"
							size={28}
							color="white"
						/>
					</TouchableOpacity>
				}
				centerComponent={{
					text: "Course Attendance",
					style: styles.heading,
				}}
			/>
			<View style={styles.body}>
				{dates.length ? (
					<View style={styles.bodyContainer}>
						<TouchableOpacity
							style={styles.pickerContainer}
							onPress={toggleModal}
						>
							<Text>{selectedDate}</Text>
							<MaterialIcons
								name="arrow-drop-down"
								size={24}
								color="black"
							/>
						</TouchableOpacity>

						<ScrollView style={styles.scrollview}>
							{currentRecords?.map((record, index) => (
								<RecordItem key={index} record={record} />
							))}
						</ScrollView>
					</View>
				) : (
					<NoData />
				)}
			</View>
			<SelectDate
				dates={dates}
				selectedDate={selectedDate}
				onDateSelected={onDateSelected}
				show={showModal}
				toggleModal={toggleModal}
			/>
		</SafeAreaProvider>
	);
};

const RecordItem = ({ record }) => {
	const { student, attendance } = record;
	return (
		<>
			<View style={styles.recordItem}>
				<Text style={styles.recordDate}>
					{student?.firstName} {student?.lastName}
				</Text>
				<AntDesign
					name={
						attendance[0]?.status === "Present"
							? "checkcircle"
							: "closecircle"
					}
					size={18}
					color={
						attendance[0]?.status === "Present"
							? COLORS.green
							: COLORS.red
					}
				/>
			</View>
			<Divider />
		</>
	);
};

const SelectDate = ({
	dates,
	selectedDate,
	onDateSelected,
	show,
	toggleModal,
}) => {
	const handleSelect = (date) => {
		onDateSelected(date);
		toggleModal();
	};
	return (
		<Overlay
			onBackdropPress={toggleModal}
			isVisible={show}
			overlayStyle={styles.pickerOverlay}
		>
			<ScrollView>
				{dates.map((date, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => handleSelect(date)}
						style={styles.dateItem}
					>
						<Text
							style={[
								styles.dateItemText,
								{
									fontWeight:
										date === selectedDate
											? "700"
											: "normal",
								},
							]}
						>
							{date}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</Overlay>
	);
};

export default CourseAttendance;

const styles = StyleSheet.create({
	headerContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.blue,
		width: "100%",
		paddingVertical: 10,
		borderBottomWidth: 0,
	},
	heading: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 5,
	},
	body: {
		flex: 1,
		backgroundColor: COLORS.light,
		borderTopEndRadius: 8,
		borderTopStartRadius: 8,
		padding: 10,
	},
	bodyContainer: {
		height: "98%",
		elevation: 5,
		backgroundColor: COLORS.white,
		borderRadius: 8,
		padding: 20,
		marginHorizontal: 10,
		marginVertical: 10,
	},
	card: {
		backgroundColor: COLORS.white,
		borderRadius: 8,
		height: 550,
	},
	scrollview: {
		borderWidth: 0.5,
		borderColor: COLORS.grey,
		borderRadius: 4,
	},
	pickerContainer: {
		width: "60%",
		height: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 0.5,
		borderColor: COLORS.blue,
		borderRadius: 4,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	recordItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
	},
	recordDate: {
		fontSize: 16,
	},
	pickerOverlay: {
		width: "50%",
		maxHeight: 400,
		backgroundColor: COLORS.white,
		alignItems: "center",
	},

	dateItemText: {
		fontSize: 16,
		paddingVertical: 5,
		marginBottom: 2,
	},
});
