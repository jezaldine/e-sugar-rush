import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface TabsIconProps {
	icon: ImageSourcePropType;
	color: string;
	name: string;
	focused: boolean;
}

const TabsIcon: React.FC<TabsIconProps> = ({ icon, color, name, focused }) => {
	return (
		<View className="items-center  pt-10 justify-center gap-2">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-8 h-8"
			/>
			<Text
				className={`text-md w-full ${focused ? "font-bold" : "font-normal"}`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	);
};

export default TabsIcon;
