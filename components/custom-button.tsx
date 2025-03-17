import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
	onPress,
	text,
	style,
	textStyle,
	onDisabled,
}: {
	textStyle: string;
	style: string;
	text: string;
	onPress: (event: GestureResponderEvent) => void;
	onDisabled: boolean;
}) => {
	return (
		<TouchableOpacity
			className={`rounded-xl px-2 py-4 flex items-center justify-center ${style}`}
			onPress={onPress}
			disabled={onDisabled}
		>
			<Text className={textStyle}>{text}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
