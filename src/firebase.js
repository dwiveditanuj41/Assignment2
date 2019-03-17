import firebase from 'firebase/app'
import 'firebase/firestore'

   var config = {
    apiKey: "AIzaSyAiM9u3LK6oIiOoWhGRK0V_uS_AvJhI3FY",
    authDomain: "chatapplication-1151e.firebaseapp.com",
    databaseURL: "https://chatapplication-1151e.firebaseio.com",
    projectId: "chatapplication-1151e",
    storageBucket: "chatapplication-1151e.appspot.com",
    messagingSenderId: "1078518874504"
  };
  firebase.initializeApp(config);
  const db = firebase.firestore();
  db.settings({ timeStampInSnapshots:true})

  export default firebase;

