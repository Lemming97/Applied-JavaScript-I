import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyCsIjRco4sgsFZR9PQvdB22S1nJg3MLHP0",
  authDomain: "final-appliedjs-d1938.firebaseapp.com",
  projectId: "final-appliedjs-d1938",
  storageBucket: "final-appliedjs-d1938.appspot.com",
  messagingSenderId: "118772920664",
  appId: "1:118772920664:web:c3db3ea88e58d260fb352d",
};
firebase.initializeApp(config);
export default firebase;
