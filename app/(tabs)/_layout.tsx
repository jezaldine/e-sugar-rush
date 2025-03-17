import { TabsIcon } from "@/components";
import icons from "@/constant/icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					headerShadowVisible: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#FFCA08",
					tabBarInactiveTintColor: "#fff",
					tabBarStyle: {
						backgroundColor: "#015d9c",
						// borderTopColor: "#232533",
						shadowColor: "#5c5b59",
						height: 80,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabsIcon
								icon={icons.Home}
								name="HOME"
								focused={focused}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="control"
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabsIcon
								icon={icons.Control}
								name="CONTROL"
								focused={focused}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="stat"
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabsIcon
								icon={icons.Stat}
								name="STATS"
								focused={focused}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="setting"
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabsIcon
								icon={icons.Setting}
								name="SETTINGS"
								focused={focused}
								color={color}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
