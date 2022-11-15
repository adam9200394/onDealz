/* /* import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDbk9icnFhGRt29iwTB7Jkerc0FXYu4eA",
  authDomain: "ondeals-3ca7f.firebaseapp.com",
  projectId: "ondeals-3ca7f",
  storageBucket: "ondeals-3ca7f.appspot.com",
  messagingSenderId: "455152543412",
  appId: "1:455152543412:web:f31d0b98211fec03a059e1",
  measurementId: "G-254M63ZDLE"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('connected')
}

export { firebase } ;
export const app = initializeApp(firebaseConfig);
 */



/* import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDDbk9icnFhGRt29iwTB7Jkerc0FXYu4eA",
    authDomain: "ondeals-3ca7f.firebaseapp.com",
     databaseURL: 'https://rahol-86317-default-rtdb.firebaseio.com/',
    projectId: "ondeals-3ca7f",
    storageBucket: "ondeals-3ca7f.appspot.com",
    messagingSenderId: "455152543412",
    appId: "1:455152543412:web:f31d0b98211fec03a059e1",
    measurementId: "G-254M63ZDLE"
};

initializeApp(firebaseConfig);  */


import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDbk9icnFhGRt29iwTB7Jkerc0FXYu4eA",
  authDomain: "ondeals-3ca7f.firebaseapp.com",
  databaseURL: 'https://ondeals-3ca7f-default-rtdb.firebaseio.com/',
  projectId: "ondeals-3ca7f",
  storageBucket: "ondeals-3ca7f.appspot.com",
  messagingSenderId: "455152543412",
  appId: "1:455152543412:web:f31d0b98211fec03a059e1",
  measurementId: "G-254M63ZDLE"
  };
 
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };