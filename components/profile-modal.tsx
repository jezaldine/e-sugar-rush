import icons from "@/constant/icons";
import logo from "@/constant/logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { launchImageLibraryAsync } from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
	Style: string;
	components: React.ReactNode;
}

const ProfileModal = ({ Style, components }: Props) => {
	const [image, setImage] = useState("");
	const [visible, setVisible] = useState(false);
	const [refreshing, setRefreshing] = React.useState(false);
	const [userData, setUserData] = useState("");

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	async function getData() {
		axios
			.get("https://e-sugar-rush-server.vercel.app/get-all-user")
			.then((res) => {
				setUserData(res.data.data);
			});
	}

	useEffect(() => {
		getData();

		const fetchImage = async () => {
			const result = await AsyncStorage.getItem("image");
			setImage(result || "");
		};

		fetchImage();
	});

	const pickImage = async () => {
		let result = await launchImageLibraryAsync({
			mediaTypes: "livePhotos",
			allowsEditing: true,
			aspect: [5, 5],
		});

		if (!result.canceled) {
			await AsyncStorage.setItem("image", result.assets[0].uri);
		}
		setVisible(false);
	};

	const removeImage = async () => {
		await AsyncStorage.removeItem("image");
		setVisible(false);
	};

	const visibility = () => {
		setVisible((prev) => !prev);
	};

	const renderItem = ({ item }: any) => {
		return (
			<>
				<View className="flex-row justify-center mb-4 items-center gap-3">
					<Text className="text-2xl font-bold text-white">
						{item.firstName}
					</Text>
					<Text className="text-2xl text-white">{item.lastName}</Text>
				</View>
				<View className="flex-row w-full  mb-1 items-center gap-3">
					<Text className="text-lg text-right text-white w-32">Username:</Text>
					<Text className="text-lg text-left text-white">{item.username}</Text>
				</View>
				<View className="flex-row w-full items-center gap-3">
					<Text className="text-lg text-right text-white w-32">Address:</Text>
					<Text className="text-lg text-left text-wrap text-white">
						{item.address}
					</Text>
				</View>
			</>
		);
	};

	return (
		<View
			className={`w-full self-center top-24 justify-center items-center ${Style}`}
		>
			<Image source={logo.Sugarcane} className="top-2" />
			<View className="absolute w-full justify-center top-[160px] z-[1000px] items-center">
				<View className="rounded-full w-52 h-52 bg-gray-300">
					<Image
						resizeMode="contain"
						source={!image ? icons.Profile : { uri: image }}
						className="rounded-full w-52 h-52"
					/>
				</View>
				<TouchableOpacity
					onPress={visibility}
					className="absolute flex-row rounded-md border px-2 py-1 top-40 right-28 bg-primary3 border-gray-300 justify-center items-center gap-1"
				>
					<Image
						resizeMode="contain"
						tintColor={"#fff"}
						className="  w-4 h-4"
						source={icons.Pen}
					/>
					<Text className="text-white text-base">Edit</Text>
				</TouchableOpacity>
				<View
					className={`right-[90px] top-52 ${visible ? "absolute" : "hidden"}`}
				>
					<View className="h-4 absolute z-50 rounded-sm -top-[6px] left-[135px] border-t border-l w-4 border-white bg-primary rotate-45"></View>
					<View className="bg-primary border border-gray-300 flex rounded-xl items-start gap-3 py-4 px-6 w-48">
						<TouchableOpacity onPress={pickImage}>
							<Text className="text-white w-full text-left text-base">
								Upload a photo...
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={removeImage}>
							<Text className="text-white w-full text-left text-base">
								Remove a photo
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View className="py-14  bg-primary3 rounded-3xl border border-gray-300 absolute w-full top-[305px]">
				<FlatList data={userData} renderItem={renderItem} />
				{components}
			</View>
		</View>
	);
};

export default ProfileModal;
