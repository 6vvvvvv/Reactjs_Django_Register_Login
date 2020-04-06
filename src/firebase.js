import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

//************************************************************/
//create an instance of google provider
//First of all, we need to get a reference to the user’s document in the users collection. We can do this with the doc method
//that Firestore provides. Once that’s done, we need to get the current content of the document, and we can do this with the get
// method of the user reference.

const firebaseConfig = {
// add your personal google firebase api here
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firebase.database();

// //google login provider
// export const signInWithGoogle = () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithPopup(provider)
// };


// //github login provider
// //OAuth https://github.com/settings/applications/new
// export const signInWithGihub = () => {
//   const provider = new firebase.auth.GithubAuthProvider();
//   firebase.auth().signInWithPopup(provider)
// };

