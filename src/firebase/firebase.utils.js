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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;  // If no user is signed in , just return

    const userRef = firestore.doc(`users/${userAuth.uid}`)  // just creates a document in firestore with id of the signedIn user's Id i.e uid
    const snapShot = await userRef.get()  // Getting a snapShot of the document created and saving it as userRef

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();   // We want to also know when we made the document

        try {
            await userRef.set({  // the .set() method is just a firebase method for creating a document in the firestore with those properties
                displayName,
                email,
                createAt,
                ...additionalData
            }) // 
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;
}



firebase.initializeApp(config)


export const auth = firebase.auth()
export const firestore = firebase.firestore()



const provider = new firebase.auth.GoogleAuthProvider();




provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;