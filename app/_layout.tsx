import { Header } from "@/components";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
	}, [loaded]);

	if (!loaded) return null;

	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="(auth)"
				options={{
					headerShown: false,
					contentStyle: {
						backgroundColor: "#015d9c",
					},
				}}
			/>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerTitle: () => {
						return <Header.HeaderTitle />;
					},
					headerRight: () => {
						return <Header.HeaderRight />;
					},
					// headerTintColor: "#000",
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: "#015d9c",
					},
					contentStyle: {
						backgroundColor: "#015d9c",
					},
				}}
			/>
		</Stack>
	);
}
