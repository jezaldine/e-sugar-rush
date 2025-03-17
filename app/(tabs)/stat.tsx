import logo from "@/constant/logo";
import database from "@/lib/firebase.config";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stat = () => {
	const [refreshing, setRefreshing] = React.useState(false);
	const [mainStorage, setMainStorage] = React.useState(0);
	const [juiceStorage, setJuiceStorage] = React.useState(0);
	const [cookingTime, setCookingTime] = React.useState(0);
	const [isCookingRunning, setIsCookingRunning] = React.useState(false);
	const [dryingTime, setDryingTime] = React.useState(0);
	const [isDryingRunning, setIsDryingRunning] = React.useState(false);
	const [temperature, setTemperature] = React.useState(0);

	React.useEffect(() => {
		getMainStorage();
		getJuiceStorage();
	});

	useEffect(() => {
		const timerRef = ref(database, "Timer/cooking");

		const onValueChange = onValue(timerRef, (snapshot) => {
			const newTime = snapshot.val();
			if (newTime > 0 && newTime !== cookingTime) {
				setCookingTime(newTime);
				setIsCookingRunning(true);
				setTimeout(() => {
					set(timerRef, 0);
				}, 1000);
			}
		});

		return () => onValueChange();
	}, [cookingTime]);

	useEffect(() => {
		const timerRef = ref(database, "Timer/drying");

		const onValueChange = onValue(timerRef, (snapshot) => {
			const newTime = snapshot.val();
			if (newTime > 0 && newTime !== cookingTime) {
				setDryingTime(newTime);
				setIsDryingRunning(true);
				setTimeout(() => {
					set(timerRef, 0);
				}, 1000);
			}
		});

		return () => onValueChange();
	}, [dryingTime]);

	useEffect(() => {
		if (!isCookingRunning || cookingTime <= 0) {
			setIsCookingRunning(false);
			return;
		}

		// Countdown timer
		const timer = setInterval(() => {
			setCookingTime((prevTime) => {
				if (prevTime <= 1000) {
					clearInterval(timer);
					setIsCookingRunning(false);
					return 0;
				}
				return prevTime - 1000;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [isCookingRunning, cookingTime]);

	useEffect(() => {
		fetchTemperature();
		if (!isDryingRunning || dryingTime <= 0) {
			setIsDryingRunning(false);
			return;
		}

		// Countdown timer
		const timer = setInterval(() => {
			setDryingTime((prevTime) => {
				if (prevTime <= 1000) {
					clearInterval(timer);
					setIsDryingRunning(false);
					return 0;
				}
				return prevTime - 1000;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [isDryingRunning, dryingTime]);

	const formatTime = (ms: number) => {
		const totalSeconds = Math.floor(ms / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
			2,
			"0"
		)}:${String(seconds).padStart(2, "0")}`;
	};
	const fetchTemperature = () => {
		const valueRef = ref(database, "Sensors/temperature");
		const subscribe = onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			setTemperature(value);
		});

		return () => subscribe();
	};

	const getMainStorage = async () => {
		const valueRef = ref(database, "Sensors/mainStorage");

		const subscribe = await onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			setMainStorage(value);
		});
		return () => subscribe();
	};
	const getJuiceStorage = async () => {
		const valueRef = ref(database, "Sensors/juiceStorage");

		const subscribe = await onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			setJuiceStorage(value);
		});
		return () => subscribe();
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	const maxMainStorage = 15;
	const maxJuiceStorage = 5;

	const juiceStorageHeight = (juiceStorage / maxJuiceStorage) * 100;
	const mainStorageHeight = (mainStorage / maxMainStorage) * 100;

	return (
		<SafeAreaView className="h-full bg-primary py-8 px-6">
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<View className="items-center justify-center">
					<Image resizeMode="contain" source={logo.Sugarcane} />
					<View className="rounded-3xl border -mt-[160px] border-gray-300 bg-primary3 px-2 w-full pb-10">
						<Text className="text-center pt-6 pb-4 text-white text-lg">
							STATISTICS AND ANALYTICS
						</Text>
						<View className="flex-row justify-evenly items-center">
							<View className="w-52 h-[200px] bg-gray-300 rounded-3xl border-8 border-gray-300 overflow-hidden relative">
								<View
									style={{ height: `${mainStorageHeight}%` }}
									className="absolute bottom-0 w-full bg-lightYellow"
								/>

								<Text className="absolute bottom-4 mt-6 w-full text-center text-white text-lg font-bold">
									{mainStorage} L
								</Text>
							</View>
							<View className="items-center justify-center backdrop-blur-sm">
								<Text className="text-white absolute -rotate-90">
									Main Juice Storage
								</Text>
							</View>
							<View className="w-24 h-[200px] bg-gray-300 rounded-3xl border-8 border-gray-300 overflow-hidden relative">
								<View
									style={{ height: `${juiceStorageHeight}%` }}
									className="absolute bottom-0 w-full bg-yellowGreen"
								/>
								<Text className="absolute bottom-4 mt-6 w-full text-center text-white text-lg font-bold">
									{juiceStorage} L
								</Text>
							</View>
							<View className="items-center justify-center">
								<Text className="text-white absolute -rotate-90">
									Juice Output Storage
								</Text>
							</View>
						</View>
					</View>
					<View className="w-full py-3 mt-7 bg-yellowGreen rounded-2xl justify-center items-center flex-row gap-3">
							<Text className="text-white text-3xl font-semibold">
								{Number(temperature).toFixed(2)}&#8451;
							</Text>
							<Text className="text-white text-3xl font-semibold">
								Temperature
							</Text>
						</View>
					<View className="w-full bg-white mb-4 mt-10 rounded-3xl py-3 justify-center items-center">
						<Text className="text-primary font-bold text-xl text-center">
							Remaining Time For Cooking
						</Text>
						<Text className="text-primary font-bold text-2xl text-center">
							{formatTime(cookingTime)}
						</Text>
					</View>
					<View className="w-full bg-primary3 rounded-3xl py-3 justify-center items-center">
						<Text className="text-white font-bold text-xl text-center">
							In Queue: Drying
						</Text>
						<Text className="text-white font-bold text-2xl text-center">
							{formatTime(dryingTime)}
						</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Stat;
