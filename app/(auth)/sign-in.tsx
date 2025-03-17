import Sugarcane from "@/assets/logo/sugarcane.png";
import { CustomButton, CustomInput, PasswordInput } from "@/components";
import logo from "@/constant/logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [success, setSuccess] = useState(false);
	const [requestError, setRequestError] = useState(false);

	const handleChangeUsername = (eventValue: any) => {
		setUsername(eventValue);
	};

	const handleChangePassword = (eventValue: any) => {
		setPassword(eventValue);
	};

	useEffect(() => {
		if (username && password) {
			setDisabled(false);
			setError(false);
			setRequestError(false);
		} else {
			setDisabled(true);
		}
	}, [username, password]);

	if (success) {
		return <Redirect href="/home" />;
	}

	const handleLogin = async () => {
		setLoading(true);
		const data = {
			username,
			password,
		};
		try {
			axios
				.post("https://e-sugar-rush-server.vercel.app/auth/login", data)
				.then(async (res) => {
					console.log({ data: res.data });
					if (res.data.status === "ok") {
						const token = res.data.data;
						setUsername("");
						setPassword("");
						setLoading(false);
						setDisabled(true);
						setSuccess(true);
						await AsyncStorage.setItem("token", token);
					} else {
						setLoading(false);
						setDisabled(true);
						setUsername("");
						setPassword("");
						setError(true);
						setErrorMessage(res.data.data);
						console.log({ data: res.data });
					}
				});
		} catch (error) {
			setLoading(false);
			setDisabled(true);
			setUsername("");
			setPassword("");
			setError(true);
			setRequestError(true);
			console.log({ message: "Login failed", data: error });
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View
					className="flex items-center py-4 px-6"
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}
				>
					<Image className="w-full" resizeMode="contain" source={Sugarcane} />
					<View
						className={` rounded-xl p-3 mt-2 bg-white border border-gray-300 text-center w-full justify-center items-center ${
							error ? "absolute" : "hidden"
						}`}
					>
						<View className="bg-red-500 absolute h-full w-1 left-3"></View>
						<View className="bg-red-500 absolute h-full w-1 right-3"></View>
						<Text className="text-red-700 text-lg font-bold">
							{requestError ? "Request Error!" : "Login Error!"}
						</Text>
						<Text className="text-red-500 text-base font-bold">
							{errorMessage}
						</Text>
					</View>
					<View className="w-full border flex-col blur-md items-center backdrop-blur-sm  pb-8 border-gray-300 bg-backdrop rounded-3xl -mt-12">
						<Image
							className="mt-12"
							source={logo.EsugarLogo}
							resizeMode="contain"
						/>
						<Text className="py-8 text-xl text-white">
							Hello, log in to your profile
						</Text>
						<View className="flex-col w-full px-6 gap-8 justify-center items-center">
							<CustomInput
								value={username}
								onChange={handleChangeUsername}
								placeholder="Username"
								inputMode="text"
							/>
							<PasswordInput
								value={password}
								onChange={handleChangePassword}
								inputMode="text"
								placeholder="Password"
								styleProp="mx-[107px] mt-[12px]"
							/>
						</View>

						<View
							className={`first-letter:justify-center w-full px-6 mt-14 mb-6 ${
								disabled ? "opacity-50" : ""
							}`}
						>
							<CustomButton
								text={loading ? "Loading..." : "Login"}
								onDisabled={disabled}
								onPress={handleLogin}
								style="bg-yellow font-bold"
								textStyle="text-black"
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
