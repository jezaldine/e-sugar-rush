/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#015d9c",
				backdrop: "#014c8a",
				primary2: "#0262a1",
				primary3: "#034f85",
				yellow: "#FFCA08",
				textColor: "#024f8e",
				other: "#025d9d",
				yellowGreen: "#aacc00",
				lightYellow: "#ffca08",
				brown: "#cc4900",
			},
		},
	},
	plugins: [],
};
