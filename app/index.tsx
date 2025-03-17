import logo from "@/constant/logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";

export default function Index() {
	const [redirectTo, setRedirectTo] = useState<string | null>(null); // State to determine where to redirect

	useEffect(() => {
		const verifyToken = async () => {
			try {
				const token = await AsyncStorage.getItem("token");
				console.log(token);
				if (!token) {
					setRedirectTo("/sign-in");
					return;
				}
				await axios
					.post("https://e-sugar-rush-server-lac.vercel.app/userdata", {
						token: token,
					})
					.then(async (res) => {
						console.log("Token Verified");
						setRedirectTo("/home");
					});
			} catch (error) {
				console.error("Error verifying token:", error);
				setRedirectTo("/sign-in");
			}
		};
		setTimeout(() => {
			verifyToken();
		}, 3000);
	}, []);

	if (redirectTo) {
		return <Redirect href={redirectTo as any} />;
	}

	return (
		<View className="flex items-center justify-center h-full w-full bg-primary">
			<Image resizeMode="contain" source={logo.EsugarLogo} alt="EsugarLogo" />
		</View>
	);
}
