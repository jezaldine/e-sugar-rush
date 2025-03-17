import React from "react";
import { TextInput } from "react-native";

const CustomInput = ({
	placeholder,
	inputMode,
	value,
	onChange,
}: {
	placeholder: string;
	inputMode: any;
	value: string;
	onChange: (eventValue: string) => void;
}) => {
	return (
		<TextInput
			autoCorrect={false}
			enablesReturnKeyAutomatically
			autoCapitalize="none"
			value={value}
			onChangeText={onChange}
			inputMode={inputMode}
			placeholder={placeholder}
			className="bg-white text-gray-500 border-gray-300 border-2 w-full px-4 py-4 rounded-xl"
		/>
	);
};

export default CustomInput;
