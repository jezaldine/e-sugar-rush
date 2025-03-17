import icons from "@/constant/icons";
import React from "react";
import { Image, View } from "react-native";

const VisibleEye = ({ style }: { style: string }) => {
	return (
		<View
			className={`absolute h-16 w-16 items-center justify-center p-0 ${style}`}
		>
			<Image
				className="w-7 h-7"
				resizeMode="contain"
				tintColor="#024f8e"
				source={icons.Eye}
			/>
		</View>
	);
};
export default VisibleEye;
