// import Firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { seedDatabase } from '../seed'


const config = {
    apiKey: "AIzaSyCRlzsOviwpO-2Udan55NCBvIGkPQZTjRA",
    authDomain: "comp313-litegram-83850.firebaseapp.com",
    projectId: "comp313-litegram-83850",
    storageBucket: "comp313-litegram-83850.appspot.com",
    messagingSenderId: "637333537260",
    appId: "1:637333537260:web:c62cd5616eeee30fc280c9"
};

const fireBase = firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;

seedDatabase(fireBase)

export { fireBase, FieldValue };