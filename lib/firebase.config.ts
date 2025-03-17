// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAuCoNK3FuFsHC_T1JQYTEK8Xh35AQMgUU",
	authDomain: "e-sugar-rush-5329b.firebaseapp.com",
	databaseURL: "https://e-sugar-rush-5329b-default-rtdb.firebaseio.com",
	projectId: "e-sugar-rush-5329b",
	storageBucket: "e-sugar-rush-5329b.firebasestorage.app",
	messagingSenderId: "359565738447",
	appId: "1:359565738447:web:c53e7b6b098b9e563cd2ba",
	measurementId: "G-BBREJPQW5Z"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
