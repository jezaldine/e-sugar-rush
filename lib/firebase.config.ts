// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDIUvTegr1EgYJ9qgw7lqKSV2UoG75HKRk",
	authDomain: "e-sugar-rush.firebaseapp.com",
	databaseURL: "https://e-sugar-rush-default-rtdb.firebaseio.com",
	projectId: "e-sugar-rush",
	storageBucket: "e-sugar-rush.firebasestorage.app",
	messagingSenderId: "348973673354",
	appId: "1:348973673354:web:7a06a675ae562a55557673",
	measurementId: "G-HTEM64XZ62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
