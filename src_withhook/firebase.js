import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

//************************************************************/
//create an instance of google provider
//First of all, we need to get a reference to the user’s document in the users collection. We can do this with the doc method
//that Firestore provides. Once that’s done, we need to get the current content of the document, and we can do this with the get
// method of the user reference.

const firebaseConfig = {
  apiKey: "AIzaSyDXjr-z7lGZ-67RoixggseNo_TFCpBP6iI",
  authDomain: "auth-lw.firebaseapp.com",
  databaseURL: "https://auth-lw.firebaseio.com",
  projectId: "auth-lw",
  storageBucket: "auth-lw.appspot.com",
  messagingSenderId: "524556200097",
  appId: "1:524556200097:web:de6db0f1d3d13d66df68e0",
  measurementId: "G-GR185CNB5W",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//************************************************************/
//sign in method with popup or signInWithRedirect to a new page
//here can export and import to the place where we can sign in 7
//with google with the button
// var provider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = () => {
//   auth.signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });
// };

export const signInWithGoogle = () => {
  // Using a popup.
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}

//We now want to check if there is data at the specified reference. If there is no data,
//we want to write some data to that document. After that, we will return the user’s data
//using the getUserDocument function. If there is data, we will return the user’s data right away.
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return null;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      //FIXME:
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });


    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
