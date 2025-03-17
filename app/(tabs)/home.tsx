import logo from "@/constant/logo";
import React from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);
	return (
		<SafeAreaView className="h-full bg-primary py-8 px-6">
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<View className="justify-center items-center border-gray-300 bg-primary3 border rounded-3xl ">
					<Image
						className="w-44 h-44 -mr-[83px] -mb-4  mt-2"
						resizeMode="contain"
						source={logo.Sugarcane}
					/>
					<Image resizeMode="contain" source={logo.EsugarLogo} />
					<Text className="font-bold text-lg mt-4 text-center text-white">
						AUTOMATED MUSCOVADO SUGAR MAKER
					</Text>
					<Text className="px-2 text-white mt-4 mb-10 text-base text-center">
						The E-Sugar Rush automated sugarcane processing machine is a
						cutting-edge system designed to streamline the production of
						muscovado sugar. This project aims to automate key processes
						involved in sugarcane crushing, juice extraction, and muscovado
						production, reducing the need for manual labor while improving
						efficiency and consistency. Powered by a microcontroller, the system
						integrates a motorized roller for crushing sugarcane for smooth
						material handling, a juice extractor, and a heating element to
						process the juice into sugar. Additionally, cooling mechanisms
						ensure the sugar is properly solidified for collection. The project
						is designed to enhance productivity in small to medium-scale
						muscovado sugarcane production by optimizing workflow, lowering
						operational costs, and improving product quality.
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
