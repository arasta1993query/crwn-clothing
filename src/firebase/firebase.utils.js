import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCfx7JPdVRDj5NQDgLDZlNFBXKz_QKjp38",
    authDomain: "crwn-db-457b5.firebaseapp.com",
    databaseURL: "https://crwn-db-457b5.firebaseio.com",
    projectId: "crwn-db-457b5",
    storageBucket: "",
    messagingSenderId: "104323545475",
    appId: "1:104323545475:web:1073088d42f4e2e5"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;

};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;