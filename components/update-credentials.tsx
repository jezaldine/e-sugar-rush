import logo from "@/constant/logo";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
	Style: string;
	children: React.ReactNode;
	actions: React.ReactNode;
}

const UpdateCredentials = ({ Style, children, actions }: Props) => {
	return (
		<View
			className={`w-full self-center justify-center items-center rounded-3xl border border-gray-500 bg-white  ${Style}`}
		>
			<Image
				resizeMode="contain"
				className="w-40 h-40 top-2"
				source={logo.Sugarcane}
			/>
			<View className="w-full bg-primary3 border  border-gray-300 rounded-3xl px-8 gap-3 py-8">
				<Image
					resizeMode="contain"
					className="w-24 h-24 z-50 absolute -top-14 justify-center items-center self-center "
					source={logo.Logo}
				/>
				<Text className="text-white pt-2 pb-2 text-center w-full font-bold text-2xl">
					Update Credentials
				</Text>
				<Text className="text-white text-lg -top-2 font-semibold pb-0">
					New Info:
				</Text>
				<SafeAreaView>
					<ScrollView>
						<View className="gap-3">{children}</View>
					</ScrollView>
				</SafeAreaView>

				<View className="flex-row justify-end pt-2 items-center gap-8">
					{actions}
				</View>
			</View>
		</View>
	);
};

export default UpdateCredentials;
