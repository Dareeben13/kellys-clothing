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

    // const collectionRef = firestore.collection('users')
    const snapShot = await userRef.get()  // Getting a snapShot of the document created and saving it as userRef

    // const collectionSnapshot = await collectionRef.get()

    // console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) })

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

// WE CAN ONLY MAKE ONE SET CALL TO FIRESTORE AT ONCE
// In other to make multiple set call , we have to make a batch write

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)


    const batch = firestore.batch()
    // We loop through the entire objectsToAdd array using a foreach array method
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc(); // not specifying any thing to .doc , firestore generates a new id for each doc
        // We now need to set the value using batch , not set because we want to batch the set requests

        batch.set(newDocRef, obj)
    })
    // WE now need to fire of our batch call using batch.commit
    // batch.commit returns a promise
    return await batch.commit()

}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const { title, items } = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),  // encodeURI is a method that comes with every Javascript render. 
            // We pass encodeURI a string , and it encodes every special characters in the string
            id: doc.id,
            title,
            items
        }
    })

    // console.log('TRANSFORMED COLLECTIONS', transformedCollections)

    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth)
        }, reject)
    })
}

firebase.initializeApp(config)


export const auth = firebase.auth()
export const firestore = firebase.firestore()



export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;