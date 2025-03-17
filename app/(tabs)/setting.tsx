import { ProfileModal, UpdateCredentials } from "@/components";
import icons from "@/constant/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import {
	Image,
	RefreshControl,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Setting = () => {
	const [redirectTo, setRedirectTo] = useState(false);
	const [visible, setVisible] = useState(false);
	const [refreshing, setRefreshing] = React.useState(false);
	const [credentialsVisible, setCredentialsVisible] = useState(false);
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [disable, setDisabe] = React.useState(false);
	const [successMessage, setSuccessMessage] = React.useState("");
	const [success, setSuccess] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const updateFirstName = (eventValue: string) => {
		setFirstName(eventValue);
	};
	const updateLastName = (eventValue: string) => {
		setLastName(eventValue);
	};
	const updateAddress = (eventValue: string) => {
		setAddress(eventValue);
	};

	const handleUpdateButton = async () => {
		setLoading(true);
		const formData = {
			username: "owner",
			firstName,
			lastName,
			address,
		};
		const response = await axios.post(
			"https://e-sugar-rush-server.vercel.app/update",
			formData
		);
		if (response.status === 200) {
			setSuccess(true);
			setLoading(false);
			setFirstName("");
			setLastName("");
			setAddress("");
			setSuccessMessage(response.data.data);
		}
	};

	React.useEffect(() => {
		if (!firstName || !lastName || !address) {
			setDisabe(true);
		} else {
			setDisabe(false);
		}

		if (!credentialsVisible) {
			setLoading(false);
		}
	});

	const handleLogoutPress = async () => {
		await AsyncStorage.removeItem("token");
		setTimeout(() => {
			checkToken();
		}, 2000);
	};

	const handleCloseUpdateCredentials = () => {
		setCredentialsVisible(false);
		setLoading(false);
		setSuccess(false);
		setLoading(credentialsVisible);
		setFirstName("");
		setLastName("");
		setAddress("");
	};

	const credentialsVisibility = () => {
		setCredentialsVisible((prev) => !prev);
	};

	const handleModalClose = () => {
		setVisible(false);
	};

	const handleModalOpen = () => {
		setVisible(true);
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			checkToken();
		}, 2000);
		setTimeout(() => {
			setRefreshing(false);
			setVisible(false);
		}, 2000);
	}, []);

	const checkToken = async () => {
		await AsyncStorage.getItem("token").then((res) => {
			if (res === null) {
				setRedirectTo(true);
			}
		});
	};

	if (redirectTo) {
		return <Redirect href={"/sign-in"} />;
	}
	return (
		<SafeAreaView className="h-full bg-primary py-8 px-6">
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<View className="justify-center items-center">
					<Text className="text-start mb-4 text-white font-medium w-full text-xl">
						Account
					</Text>
					<View className=" w-full justify-center items-center bg-primary3 border gap-5 border-gray-300 rounded-3xl py-8 px-10">
						<View className="flex-row w-full justify-start items-center gap-10">
							<Image
								className="w-8 h-8"
								tintColor="#fff"
								resizeMode="contain"
								source={icons.User}
							/>
							<TouchableOpacity onPress={handleModalOpen}>
								<Text className="text-xl font-medium text-white">Profile</Text>
							</TouchableOpacity>
						</View>
						<View className="flex-row w-full justify-start items-center gap-10">
							<Image
								className="w-8 h-8"
								tintColor="#fff"
								resizeMode="contain"
								source={icons.Security}
							/>
							<TouchableOpacity onPress={credentialsVisibility}>
								<Text className="text-xl font-medium text-white">
									Update Credentials
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<Text className="text-start mt-10 mb-4 text-white font-medium w-full text-xl">
						Action
					</Text>
					<View className="flex-row w-full justify-start items-center gap-10 bg-primary3 border border-gray-300 rounded-3xl py-8 px-10">
						<Image
							className="w-8 h-8"
							tintColor="#fff"
							resizeMode="contain"
							source={icons.Exit}
						/>
						<TouchableOpacity onPress={handleLogoutPress}>
							<Text className="text-xl font-medium text-white">Log out</Text>
						</TouchableOpacity>
					</View>
				</View>

				<UpdateCredentials
					actions={
						<>
							<TouchableOpacity
								onPress={handleCloseUpdateCredentials}
								className=" border border-gray-300 rounded-lg py-2 px-4"
							>
								<Text className="text-white font-bold text-lg">Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={handleUpdateButton}
								disabled={disable}
								className={` rounded-lg py-2 px-6 ${
									disable ? "bg-gray-500" : "bg-gray-300"
								}`}
							>
								<Text className="text-white font-bold text-lg">
									{loading ? "Saving..." : "Save"}
								</Text>
							</TouchableOpacity>
						</>
					}
					children={
						<>
							<TextInput
								autoCorrect={false}
								enablesReturnKeyAutomatically
								autoCapitalize="none"
								value={firstName}
								onChangeText={updateFirstName}
								inputMode="text"
								placeholder="First Name"
								className="bg-white text-gray-500  border-gray-300 border-2 w-full px-4 py-4 rounded-xl"
								defaultValue={firstName}
							/>
							<TextInput
								autoCorrect={false}
								enablesReturnKeyAutomatically
								autoCapitalize="none"
								value={lastName}
								onChangeText={updateLastName}
								inputMode="text"
								placeholder="Last Name"
								className="bg-white text-gray-500 border-gray-300 border-2 w-full px-4 py-4 rounded-xl"
								defaultValue={lastName}
							/>
							<TextInput
								autoCorrect={false}
								enablesReturnKeyAutomatically
								autoCapitalize="none"
								value={address}
								onChangeText={updateAddress}
								inputMode="text"
								placeholder="Address"
								className="bg-white text-gray-500 border-gray-300 border-2 w-full px-4 py-4 rounded-xl"
								defaultValue={address}
							/>
						</>
					}
					Style={credentialsVisible ? "absolute" : " hidden"}
				/>
			</ScrollView>
			<View
				className={`z-[2000px] bottom-5 self-center rounded-xl p-3 mt-2 bg-white border border-gray-300 text-center w-full justify-center items-center ${
					success ? "absolute" : "hidden"
				}`}
			>
				<View className="bg-green-500 absolute h-full w-1 left-3"></View>
				<View className="bg-green-500 absolute h-full w-1 right-3"></View>
				<Text className="text-green-700 text-lg font-bold">
					{!success ? "Request Error!" : "Success"}
				</Text>
				<Text className="text-green-500 text-base font-bold">
					{successMessage}
				</Text>
			</View>
			<ProfileModal
				components={
					<TouchableOpacity
						onPress={handleModalClose}
						className="bg-primary3 border border-gray-300 font-bold px self-center py-2 px-5 rounded-xl mt-6 justify-center items-center text-center"
					>
						<Text className="text-white text-center font-bold text-2xl">
							Close
						</Text>
					</TouchableOpacity>
				}
				Style={`${visible ? "absolute" : "hidden"}`}
			/>
		</SafeAreaView>
	);
};

export default Setting;
