import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBH_xf8gMgxd7zxAmu242igi-_kYhmi-qg",
    authDomain: "recetario-2021.firebaseapp.com",
    databaseURL: "https://recetario-2021-default-rtdb.firebaseio.com",
    projectId: "recetario-2021",
    storageBucket: "recetario-2021.appspot.com",
    messagingSenderId: "690510271016",
    appId: "1:690510271016:web:f55512c536dcc9be94db1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app