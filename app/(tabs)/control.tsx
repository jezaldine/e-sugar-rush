import icons from "@/constant/icons";
import logo from "@/constant/logo";
import database from "@/lib/firebase.config";
import AntDesign from "@expo/vector-icons/AntDesign";
import { get, onValue, ref, set } from "firebase/database";
import React, { useEffect } from "react";
import {
	Image,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

const toBoilJuiceData = [
	{ label: "None", value: 0 },
	{ label: "1 Litter", value: 1 },
	{ label: "2 Litters", value: 2 },
	{ label: "3 Litters", value: 3 },
	{ label: "4 Litters", value: 4 },
	{ label: "5 Litters", value: 5 },
	{ label: "6 Litters", value: 6 },
	{ label: "7 Litters", value: 7 },
	{ label: "8 Litters", value: 8 },
	{ label: "9 Litters", value: 9 },
	{ label: "10 Litters", value: 10 },
	{ label: "11 Litters", value: 10 },
	{ label: "12 Litters", value: 10 },
	{ label: "13 Litters", value: 10 },
	{ label: "14 Litters", value: 10 },
	{ label: "15 Litters", value: 10 },
];

const toJuiceStorageData = [
	{ label: "None", value: 0 },
	{ label: "1 Litter", value: 1 },
	{ label: "2 Litters", value: 2 },
	{ label: "3 Litters", value: 3 },
	{ label: "4 Litters", value: 4 },
	{ label: "5 Litters", value: 5 },
];

const Control = () => {
	const [refreshing, setRefreshing] = React.useState(false);
	const [power, setPower] = React.useState(false);
	const [isPower, setIsPower] = React.useState(false);
	const [extract, setExtract] = React.useState(false);
	const [isExtract, setIsExtract] = React.useState(false);
	const [toMainSorage, setToMainStorage] = React.useState(false);
	const [isToMainSorage, setIsToMainStorage] = React.useState(false);
	const [disableFilteredButton, setDisableFilteredButton] =
		React.useState(false);
	// const [dry, setDry] = React.useState(false);
	// const [isDry, setIsDry] = React.useState(false);
	const [startExtraction, setStartExtraction] = React.useState(false);
	const [startTransfering, setStartTransfering] = React.useState(false);
	const [isStartBoiling, setIsStartBoiling] = React.useState(false);
	const [isStartTransfering, setIsStartTransfering] = React.useState(false);
	const [temperature, setTemperature] = React.useState(0);
	const [disable, setDisable] = React.useState(false);
	const [isBloiling, setIsBoiling] = React.useState(false);
	const [isTrasfering, setIsTransfering] = React.useState(false);
	const [toBoilJuiceValue, setToBoilJuiceValue] = React.useState(0);
	const [toJuiceStorageValue, setToJuiceStorageValue] = React.useState(0);
	const [isFocus, setIsFocus] = React.useState(false);
	const [isTransferingWorking, setIsTransferingWorking] = React.useState(false);
	const [checkingJuiceStorage, setCheckingJuiceStorage] = React.useState(true);
	const [juiceToBoilerTime, setJuiceToBoilerTime] = React.useState(0);
	const [isToBoilRunning, setIsToBoilRunning] = React.useState(false);
	const [juiceToJuiceStorageTime, setJuiceToJuiceStorageTime] =
		React.useState(0);
	const [isToJuiceStorageRunninng, setIsToJuiceStorageRunning] =
		React.useState(false);
	const [isCooking, setIsCooking] = React.useState(false);
	const [isDrying, setIsDrying] = React.useState(false);
	const [isTransferToDrying, setIsTransferToDrying] = React.useState(false);
	const [isTransferToPulvorizer, setIsTransferToPulvorizer] =
		React.useState(false);
	const [isPulvorizer, setIsPulvorizer] = React.useState(false);

	useEffect(() => {
		const timeRef = ref(database, "Timer/juiceToBoiler");

		const getMainStorage = async () => {
			const valueRef = ref(database, "Sensors/mainStorage");

			const subscribe = await onValue(valueRef, (snapshot) => {
				const value = snapshot.val();
				if (value > 14) {
					setDisableFilteredButton(true);
				} else {
					setDisableFilteredButton(false);
				}
			});
			return () => subscribe();
		};

		const onBoilValueChange = onValue(timeRef, (snapshot) => {
			const newTime = snapshot.val();
			if (newTime > 0 && newTime !== juiceToBoilerTime) {
				setJuiceToBoilerTime(newTime);
				setIsToBoilRunning(true);
				setTimeout(() => {
					set(timeRef, 0);
				}, 1000);
			}
		});

		return () => {
			onBoilValueChange();
			getMainStorage();
		};
	}, [juiceToBoilerTime]);

	useEffect(() => {
		const timeRef = ref(database, "Timer/juiceToJuiceStorage");

		const onJuiceStorageValueChange = onValue(timeRef, (snapshot) => {
			const newTime = snapshot.val();
			if (newTime > 0 && newTime !== juiceToJuiceStorageTime) {
				setJuiceToJuiceStorageTime(newTime);
				setIsToJuiceStorageRunning(true);
				setTimeout(() => {
					set(timeRef, 0);
				}, 1000);
			}
		});

		return () => {
			onJuiceStorageValueChange();
		};
	}, [juiceToJuiceStorageTime]);

	useEffect(() => {
		if (!setIsToJuiceStorageRunning || juiceToJuiceStorageTime <= 0) {
			setIsToBoilRunning(false);
			return;
		}

		const juiceStorageTimer = setInterval(() => {
			setJuiceToJuiceStorageTime((prevTime) => {
				if (prevTime <= 1000) {
					clearInterval(juiceStorageTimer);
					setIsToJuiceStorageRunning(false);
					return 0;
				}
				return prevTime - 1000;
			});
		}, 780);

		return () => clearInterval(juiceStorageTimer);
	}, [isToJuiceStorageRunninng, juiceToJuiceStorageTime]);

	useEffect(() => {
		if (!isToBoilRunning || juiceToBoilerTime <= 0) {
			setIsToBoilRunning(false);
			return;
		}

		const boilTimer = setInterval(() => {
			setJuiceToBoilerTime((prevTime) => {
				if (prevTime <= 1000) {
					clearInterval(boilTimer);
					setIsToBoilRunning(false);
					return 0;
				}
				return prevTime - 1000;
			});
		}, 780);

		return () => clearInterval(boilTimer);
	}, [isToBoilRunning, juiceToBoilerTime]);

	useEffect(() => {
		if (isStartBoiling || isStartTransfering) {
			setIsTransferingWorking(true);
		} else {
			setIsTransferingWorking(false);
		}
		setBoiLJuiceSize();
		setTransferJuiceSize();
		fetchTemperature();
		getPowerValue();
		getExtractValue();
		getFilteredValue();
		getStartExtractionValue();
		getStartTransferingValue();
		getJuiceStorageValue();
		if (!isPower) {
			setDisable(true);
			updateControls();
		} else {
			setDisable(false);
		}

		if (toBoilJuiceValue === 0) {
			setIsBoiling(true);
		} else {
			setIsBoiling(false);
		}

		if (toJuiceStorageValue === 0) {
			setIsTransfering(true);
		} else {
			setIsTransfering(false);
		}
	});

	useEffect(() => {
		const cookingTime = ref(database, "Pass/isCooking");
		const dryingTime = ref(database, "Pass/isDrying");
		const transferToDrying = ref(database, "Pass/transferToDrying");
		const transferToPulvorizer = ref(database, "Pass/transferToPulvorizer");
		const pulvorizer = ref(database, "Pass/pulvorizer");

		const subscribeCooking = onValue(cookingTime, (snapshot) => {
			const value = snapshot.val();
			setIsCooking(value);
		});

		const subscribePulvorizer = onValue(pulvorizer, (snapshot) => {
			const value = snapshot.val();
			setIsPulvorizer(value);
		});

		const subscribeDrying = onValue(dryingTime, (snapshot) => {
			const value = snapshot.val();
			setIsDrying(value);
		});

		const subscribeTransferToDrying = onValue(transferToDrying, (snapshot) => {
			const value = snapshot.val();
			setIsTransferToDrying(value);
		});

		const subscribeTransferToPulvorizer = onValue(
			transferToPulvorizer,
			(snapshot) => {
				const value = snapshot.val();
				setIsTransferToPulvorizer(value);
			}
		);
		return () => {
			subscribeCooking();
			subscribeDrying();
			subscribeTransferToDrying();
			subscribeTransferToPulvorizer();
			subscribePulvorizer();
		};
	}, []);

	const getJuiceStorageValue = async () => {
		const valueRef = ref(database, "Sensors/juiceStorage");
		const subscribe = onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			if (value <= 2) {
				setCheckingJuiceStorage(false);
			}
			if (value > 2) {
				setCheckingJuiceStorage(true);
			}
		});

		return () => subscribe();
	};

	const setBoiLJuiceSize = async () => {
		const valueRef = ref(database, "Sizes/boilSize");
		await set(valueRef, toBoilJuiceValue);
	};

	const setTransferJuiceSize = async () => {
		const valueRef = ref(database, "Sizes/transferSize");
		await set(valueRef, toJuiceStorageValue);
	};

	const fetchTemperature = () => {
		const valueRef = ref(database, "Sensors/temperature");
		const subscribe = onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			setTemperature(value);
		});

		return () => subscribe();
	};

	const updateControls = async () => {
		const extractValueRef = ref(database, "Controls/extract");
		const filteredValue = ref(database, "Controls/filtered");
		await set(extractValueRef, false);
		await set(filteredValue, false);
	};

	const getStartExtractionValue = async () => {
		const valueRef = ref(database, "Controls/startExtraction");
		const subscribe = onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			setIsStartBoiling(value);
		});

		return () => subscribe();
	};
	const getStartTransferingValue = async () => {
		const valueRef = ref(database, "Controls/startTransfering");
		const subscribe = onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			setIsStartTransfering(value);
		});

		return () => subscribe();
	};

	const getPowerValue = async () => {
		const valueRef = ref(database, "Controls/power");
		const value = await get(valueRef);
		setIsPower(value.val());
	};
	const getExtractValue = async () => {
		const valueRef = ref(database, "Controls/extract");
		const value = await get(valueRef);
		setIsExtract(value.val());
	};
	const getFilteredValue = async () => {
		const valueRef = ref(database, "Controls/filtered");
		const value = await get(valueRef);
		setIsToMainStorage(value.val());
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	const activePower = async () => {
		const valueRef = ref(database, "Controls/power");
		await set(valueRef, power ? true : false);
		setPower((prev) => !prev);
		setIsPower(power);
	};

	const activeExtract = async () => {
		const valueRef = ref(database, "Controls/extract");
		await set(valueRef, extract ? true : false);
		setExtract((prev) => !prev);
		setIsExtract(extract);
	};

	const activePumpToMainStorage = async () => {
		const valueRef = ref(database, "Controls/filtered");
		await set(valueRef, toMainSorage ? true : false);
		setToMainStorage((prev) => !prev);
		setIsToMainStorage(toMainSorage);
	};

	const activeStartExtraction = async () => {
		const valueRef = ref(database, "Controls/startExtraction");
		await set(valueRef, startExtraction ? true : false);
		setStartExtraction((prev) => !prev);
		setIsStartBoiling(startExtraction);
	};

	const activeStartTransfering = async () => {
		const valueRef = ref(database, "Controls/startTransfering");
		await set(valueRef, startTransfering ? true : false);
		setStartTransfering((prev) => !prev);
		setIsTransfering(startTransfering);
	};

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

	return (
		<SafeAreaView className="h-full bg-primary py-8 px-6">
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<View className="justify-center items-center">
					<Image source={logo.EsugarLogo} />
					<View
						className={`w-full   z-[2000px]  bg-white rounded-xl justify-center items-center py-6 gap-2 ${
							isStartBoiling || isStartTransfering ? "absolute" : "hidden"
						}`}
					>
						<Text className="text-center text-xl text-primary  font-bold">
							{(isStartBoiling && "Transferring juice to boiler...") ||
								(isStartTransfering &&
									"Transferring juice to juice storage...")}
						</Text>
						<Image
							source={icons.Transfering}
							className="w-20 h-20"
							resizeMode="contain"
							tintColor={"#015d9c"}
						/>

						<Text className="text-center text-sm text-gray-500 font-medium">
							Please wait while the juice is being transferred to the boiler
						</Text>
						<Text className="text-center text-lg animate-pulse text-gray-500 font-medium mt-1">
							Remaining time: {isStartBoiling && formatTime(juiceToBoilerTime)}
							{isStartTransfering && formatTime(juiceToJuiceStorageTime)}
						</Text>
					</View>
					<View className="border border-gray-300 bg-primary3 rounded-3xl py-6 mt-10 px-8 w-full">
						<View className="absolute left-4  -top-5 flex-row justify-start items-center gap-1">
							<View
								className={`w-4 h-4 mr-2 border-[1px] border-gray-300 rounded-full ${
									isPower && "bg-red-500"
								}`}
							></View>
							<View
								className={`w-4 h-4 border-[1px] border-gray-300 rounded-full ${
									isExtract && "bg-yellow"
								}`}
							></View>
							<View
								className={`w-4 h-4 border-[1px] border-gray-300 rounded-full ${
									isToMainSorage && "bg-yellow"
								}`}
							></View>
						</View>
						<Text className="text-white text-lg text-center mb-4">
							MAIN CONTROLS
						</Text>
						<TouchableOpacity
							onPress={activePower}
							disabled={isTransferingWorking || isCooking || isDrying}
							className={`flex-row gap-2 items-center justify-center py-2 w-full rounded-2xl ${
								isTransferingWorking || isCooking || isDrying
									? "bg-gray-300"
									: "bg-white"
							} `}
						>
							<Text className="text-2xl font-bold text-textColor ">Power</Text>
							<Image
								className="w-6 h-6"
								tintColor="#024f8e"
								resizeMode="contain"
								source={icons.Power}
							/>
						</TouchableOpacity>
						<View className="flex-row items-center mt-2 justify-center gap-10">
							<TouchableOpacity
								disabled={
									disable || isTransferingWorking || isCooking || isDrying
								}
								onPress={activeExtract}
								className={`rounded-2xl w-24 gap-1 py-2 px-4 justify-center items-center ${
									disable || isTransferingWorking || isCooking || isDrying
										? "bg-gray-500"
										: "bg-primary"
								}`}
							>
								<Image
									className="w-8 h-8"
									resizeMode="contain"
									tintColor="#fff"
									source={icons.Roller}
								/>
								<Text className="text-white">Extract</Text>
							</TouchableOpacity>
							<TouchableOpacity
								disabled={
									disable ||
									isTransferingWorking ||
									isCooking ||
									isDrying ||
									disableFilteredButton
								}
								onPress={activePumpToMainStorage}
								className={`rounded-2xl  w-24 gap-1 py-2 px-4 justify-center items-center ${
									disable ||
									isTransferingWorking ||
									isCooking ||
									isDrying ||
									disableFilteredButton
										? "bg-gray-500"
										: "bg-primary"
								}`}
							>
								<Image
									className="w-8 h-8"
									resizeMode="contain"
									tintColor="#fff"
									source={icons.Filtered}
								/>
								<Text className="text-white">Filtered</Text>
							</TouchableOpacity>
							{/* <TouchableOpacity
								disabled={
									disable || isTransferingWorking || isCooking || isDrying
								}
								onPress={activeDry}
								className={`rounded-2xl  w-24 gap-1 py-2 px-4 justify-center items-center ${
									disable || isTransferingWorking || isCooking || isDrying
										? "bg-gray-500"
										: "bg-primary"
								}`}
							>
								<Image
									className="w-8 h-8"
									resizeMode="contain"
									tintColor="#fff"
									source={icons.Dry}
								/>
								<Text className="text-white">Dry</Text>
							</TouchableOpacity> */}
						</View>
						<View className="w-full py-3 mt-7 bg-yellowGreen rounded-2xl justify-center items-center flex-row gap-3">
							<Text className="text-white text-3xl font-semibold">
								{Number(temperature).toFixed(2)}&#8451;
							</Text>
							<Text className="text-white text-3xl font-semibold">
								Temperature
							</Text>
						</View>
						<View className="w-full pt-2 mt-4 px-8 gap-4 border-t-2 border-gray-300">
							<Text className="text-center text-white font-bold text-xl">
								Select Juice Size for Cooking
							</Text>
							<View className="flex-row justify-between gap-2 items-center">
								<Dropdown
									style={[
										styles.dropdown,
										isFocus && { borderColor: "white" },
										isStartBoiling && { backgroundColor: "gray" },
										isTransferingWorking && { backgroundColor: "gray" },
										isCooking && { backgroundColor: "gray" },
										isDrying && { backgroundColor: "gray" },
										power && { backgroundColor: "gray" },
									]}
									placeholderStyle={styles.placeholderStyle}
									selectedTextStyle={styles.selectedTextStyle}
									iconStyle={styles.iconStyle}
									disable={isStartBoiling || isTransferingWorking || power}
									data={toBoilJuiceData}
									maxHeight={300}
									labelField="label"
									valueField="value"
									placeholder={!isFocus ? "Select Size" : "..."}
									value={toBoilJuiceValue}
									onFocus={() => setIsFocus(true)}
									onBlur={() => setIsFocus(false)}
									onChange={(item) => {
										setToBoilJuiceValue(item.value);
										setIsFocus(false);
									}}
									renderLeftIcon={() => (
										<AntDesign
											style={styles.icon}
											color="white"
											name="Safety"
											size={20}
										/>
									)}
								/>
								<TouchableOpacity
									onPress={activeStartExtraction}
									disabled={
										isBloiling ||
										isStartBoiling ||
										isTransferingWorking ||
										isCooking ||
										power ||
										isDrying
									}
									className={`p-2 px-4 rounded-xl w-24 self-center mt-2 ${
										isBloiling ||
										isStartBoiling ||
										isTransferingWorking ||
										isCooking ||
										power ||
										isDrying
											? "bg-gray-500"
											: "bg-white"
									}`}
								>
									<Text
										className={` text-center font-semibold ${
											isBloiling ||
											isStartBoiling ||
											isTransferingWorking ||
											isCooking ||
											power ||
											isDrying
												? "text-white"
												: "text-primary"
										}`}
									>
										{isStartBoiling ? "working.." : "Transfer"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						<View className="w-full pt-2 pb-4 mt-4 px-8 gap-4 border-t-2 border-gray-300">
							<Text className="text-center text-white font-bold text-xl">
								Select Juice Size for Juice Storage
							</Text>
							<View className="flex-row justify-between gap-2 items-center">
								<Dropdown
									style={[
										styles.dropdown,
										isFocus && { borderColor: "white" },
										isStartTransfering && { backgroundColor: "gray" },
										checkingJuiceStorage && { backgroundColor: "gray" },
										isTransferingWorking && { backgroundColor: "gray" },
										isCooking && { backgroundColor: "gray" },
										isDrying && { backgroundColor: "gray" },
										power && { backgroundColor: "gray" },
									]}
									placeholderStyle={styles.placeholderStyle}
									selectedTextStyle={styles.selectedTextStyle}
									iconStyle={styles.iconStyle}
									disable={isStartTransfering || checkingJuiceStorage || power}
									data={toJuiceStorageData}
									maxHeight={300}
									labelField="label"
									valueField="value"
									placeholder={!isFocus ? "Select Size" : "..."}
									value={toJuiceStorageValue}
									onFocus={() => setIsFocus(true)}
									onBlur={() => setIsFocus(false)}
									onChange={(item) => {
										setToJuiceStorageValue(item.value);
										setIsFocus(false);
									}}
									renderLeftIcon={() => (
										<AntDesign
											style={styles.icon}
											color="white"
											name="Safety"
											size={20}
										/>
									)}
								/>
								<TouchableOpacity
									onPress={activeStartTransfering}
									disabled={
										isTrasfering ||
										isStartTransfering ||
										isTransferingWorking ||
										checkingJuiceStorage ||
										isCooking ||
										isDrying ||
										power
									}
									className={`p-2 px-4 rounded-xl w-24 self-center mt-2 ${
										isTrasfering ||
										isStartTransfering ||
										isTransferingWorking ||
										checkingJuiceStorage ||
										isCooking ||
										power ||
										isDrying
											? "bg-gray-500"
											: "bg-white"
									}`}
								>
									<Text
										className={` text-center font-semibold ${
											isTrasfering ||
											isStartTransfering ||
											isTransferingWorking ||
											checkingJuiceStorage ||
											isCooking ||
											power ||
											isDrying
												? "text-white"
												: "text-primary"
										}`}
									>
										{isStartTransfering ? "Working.." : "Transfer"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<Text className="pt-2 absolute -bottom-8 text-2xl text-yellow font-bold italic animate-pulse">
						{isCooking && "Cooking..."}
						{isDrying && "Drying..."}
						{isTransferToDrying && "Transferring to Drying..."}
						{isTransferToPulvorizer && "Transferring to Pulvorizer..."}
						{isPulvorizer && "Pulvorizing..."}
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Control;

const styles = StyleSheet.create({
	dropdown: {
		height: 50,
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
		width: "70%",
		margin: 0,
		padding: 0,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
		borderRadius: 8,
	},
	placeholderStyle: {
		fontSize: 16,
		color: "white",
	},
	selectedTextStyle: {
		fontSize: 16,
		color: "white",
	},
	iconStyle: {
		width: 25,
		height: 25,
	},
});
