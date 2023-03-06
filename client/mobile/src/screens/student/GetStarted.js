import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Card, Header as HeaderRNE } from "@rneui/base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import COLORS from "../../constants/colors";

import Loader from "../../components/Loader";
import TakePhoto from "../../components/TakePhoto";

const GetStarted = () => {
	const navigation = useNavigation();
	const [loading, setLoading] = React.useState(false);
	const [takePhoto, setTakePhoto] = React.useState(false);

	const toggleTakePhoto = () => {
		setTakePhoto(!takePhoto);
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
				centerComponent={{ text: "Details", style: styles.heading }}
			/>
			<View style={styles.body}>
				<Card containerStyle={styles.card}>
					<Card.Title style={styles.cardTitle}>
						Welcome To Punktual!
					</Card.Title>
					<Card.Divider />
					<Text style={styles.cardText}>
						Punktual allows you to track your attendance in your
						classes. To get started, please upload a photo of
						yourself to the system. This photo will be used to
						verify your attendance each time you punch in. Please
						note that you will not be able to punch in if you do not
						upload a photo.
					</Text>

					<Button
						icon={
							<MaterialIcons
								name="add-a-photo"
								size={20}
								color="white"
								style={{ marginRight: 5 }}
							/>
						}
						title="Take Photo"
						color={COLORS.blue}
						onPress={toggleTakePhoto}
					/>
				</Card>
			</View>
			<TakePhoto visible={takePhoto} toggleOverlay={toggleTakePhoto} />
		</SafeAreaProvider>
	);
};

export default GetStarted;

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
	},
	headerRight: {
		display: "flex",
		flexDirection: "row",
		marginTop: 5,
		marginRight: 8,
	},
	body: {
		flex: 1,
		backgroundColor: COLORS.white,
		borderTopEndRadius: 8,
		borderTopStartRadius: 8,
	},
	card: {},
	cardTitle: {
		alignSelf: "flex-start",
		fontSize: 18,
	},
	cardText: {
		fontSize: 16,
		marginBottom: 10,
		lineHeight: 25,
		textAlign: "justify",
	},
});
