import React, { useState } from "react";
import { Button, Overlay, Icon } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

const CourseFilterOverlay = ({ visible, toggleOverlay }) => {
	return (
		<Overlay
			overlayStyle={{ width: "80%", borderRadius: 10 }}
			isVisible={visible}
			onBackdropPress={toggleOverlay}
		>
			<Text style={styles.textPrimary}>Nothing Here!</Text>
			<Text style={styles.textSecondary}>
				The idea is to have some sort of filters for the courses here,
				but we'll see.
			</Text>
			<Button
				buttonStyle={styles.button}
				icon={
					<Icon
						name="wrench"
						type="font-awesome"
						color="white"
						size={25}
						iconStyle={{ marginRight: 10 }}
					/>
				}
				title="Okay"
				onPress={toggleOverlay}
			/>
		</Overlay>
	);
};

export default CourseFilterOverlay;

const styles = StyleSheet.create({
	button: {
		margin: 10,
		backgroundColor: "#1C4652",
	},
	textPrimary: {
		marginVertical: 20,
		textAlign: "center",
		fontSize: 20,
	},
	textSecondary: {
		marginBottom: 10,
		textAlign: "center",
		fontSize: 17,
	},
});
