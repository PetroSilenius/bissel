import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyCCYhS9dpSebtGJku9Z8ChC4-JCDinEV8U',
  authDomain: 'bissel-80103.firebaseapp.com',
  projectId: 'bissel-80103',
  storageBucket: 'bissel-80103.appspot.com',
  messagingSenderId: '177165913460',
  appId: '1:177165913460:web:2862d38a9cb36734f53021',
  measurementId: 'G-JKW3944MG9',
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
