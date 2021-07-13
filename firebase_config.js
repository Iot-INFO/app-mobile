import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCoyuYOkLfxntqHjUQkcZL3wDL8E7cQYVc",
  authDomain: "mobile-app-6461e.firebaseapp.com",
  databaseURL: "https://mobile-app-6461e-default-rtdb.firebaseio.com",
  projectId: "mobile-app-6461e",
  storageBucket: "mobile-app-6461e.appspot.com",
  messagingSenderId: "966472461823",
  appId: "1:966472461823:web:13bc5b28a7d2c412b94bca",
  measurementId: "G-ZXCQDYZ6YL"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;