// const firebase = require("firebase");
import firebase from 'firebase/app'

// Required for side-effects
// require("firebase/firestore");
import 'firebase/firestore'
import 'firebase/storage'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyC069ETurJX_kNAv96I5_M14xCh5YXtuTw",
        authDomain: "cs313fireproject.firebaseapp.com",
        databaseURL: "https://cs313fireproject.firebaseio.com",
        projectId: "cs313fireproject",
        storageBucket: "cs313fireproject.appspot.com",
        messagingSenderId: "55483468144",
        appId: "1:55483468144:web:d78ff6ee939c72397fe7b5"
    }
    firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
// export const storage = firebase.storage();

// Points to the root reference
export const storageRef = firebase.storage().ref();

// Points to 'images'
// export const  imagesRef = storageRef.child('images/');

// export const  productsRef = storageRef.child('products/');
