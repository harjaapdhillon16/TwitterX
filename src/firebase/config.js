import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyByBBJi7k98vDNe6ObriC7nXl39aP9XA70",
  authDomain: "twitterx-867f9.firebaseapp.com",
  databaseURL: "https://twitterx-867f9.firebaseio.com",
  projectId: "twitterx-867f9",
  storageBucket: "twitterx-867f9.appspot.com",
  messagingSenderId: "551474158565",
  appId: "1:551474158565:web:fd0e5fa703c38201c1ed0c",
  measurementId: "G-WSM3W8M38L",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;