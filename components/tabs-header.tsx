import icons from "@/constant/icons";
import logo from "@/constant/logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

const HeaderTitle = () => {
	return (
		<View className="flex-row justify-start">
			<Image
				resizeMode="contain"
				className="w-32  h-16"
				source={logo.HeaderLogo}
			/>
		</View>
	);
};

const HeaderRight = () => {
	const [image, setImage] = useState("");
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	useEffect(() => {
		const fetchImage = async () => {
			const result = await AsyncStorage.getItem("image");
			setImage(result || "");
		};

		fetchImage();
		onRefresh();
	});
	return (
		<View className="flex-row justify-center gap-4 items-center">
			<Image
				resizeMode="contain"
				tintColor="#fff"
				className="w-5 h-5"
				source={icons.Bell}
			/>
			<View className="bg-gray-300 rounded-full">
				<Image
					resizeMode="contain"
					className="w-10 border border-gray-400 rounded-full p-2 h-10"
					source={!image ? icons.Profile : { uri: image }}
				/>
			</View>
		</View>
	);
};

export default { HeaderTitle, HeaderRight };
