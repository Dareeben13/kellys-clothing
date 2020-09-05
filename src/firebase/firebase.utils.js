import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyB9fEdOdPwQpI7cV4tTPe-9jOZ3RTiSpSw",
    authDomain: "kellysdb-9b0d3.firebaseapp.com",
    databaseURL: "https://kellysdb-9b0d3.firebaseio.com",
    projectId: "kellysdb-9b0d3",
    storageBucket: "kellysdb-9b0d3.appspot.com",
    messagingSenderId: "210246877521",
    appId: "1:210246877521:web:7a30ebaed0e55113ff9370",
    measurementId: "G-1PC4F7TRF6"
};



firebase.initializeApp(config)


export const auth = firebase.auth()
export const firestore = firebase.firestore()



const provider = new firebase.auth.GoogleAuthProvider();




provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;