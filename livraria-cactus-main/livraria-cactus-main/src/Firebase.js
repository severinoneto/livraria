import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA0aNLYfXEIcIjJVnMn1PYbUOaZUl2DD8E",
    authDomain: "livraria-cactus.firebaseapp.com",
    projectId: "livraria-cactus",
    storageBucket: "livraria-cactus.appspot.com",
    messagingSenderId: "186870575181",
    appId: "1:186870575181:web:93b2741dd8a46995e22c04",
    measurementId: "G-TQKEF3QLFT"
  };
  
  firebase.initializeApp(firebaseConfig);
  export default firebase;