import React, { useState } from "react";
import { Pressable, TextInput } from "react-native";
import HiddenEye from "./hidden-eye";
import VisibleEye from "./visible-eye";

const PasswordInput = ({
	styleProp,
	placeholder,
	inputMode,
	value,
	onChange,
}: {
	styleProp: string;
	placeholder: string;
	inputMode: any;
	value: string;
	onChange: (eventValue: string) => void;
}) => {
	const [isVisible, setIsVisible] = useState(false);

	const handleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<>
			<TextInput
				autoCorrect={false}
				secureTextEntry={isVisible ? false : true}
				enablesReturnKeyAutomatically
				autoCapitalize="none"
				value={value}
				onChangeText={onChange}
				inputMode={inputMode}
				placeholder={placeholder}
				className="bg-white text-gray-500 relative border-gray-300 border-2 w-full px-4 py-4 rounded-xl"
			/>

			<Pressable className="absolute" onPress={handleVisibility}>
				{isVisible ? (
					<VisibleEye style={styleProp} />
				) : (
					<HiddenEye style={styleProp} />
				)}
			</Pressable>
		</>
	);
};

export default PasswordInput;
