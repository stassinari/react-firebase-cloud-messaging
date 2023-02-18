// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6JMHGubBYsowdKtU4E2SU9t581nDv6bc",
  authDomain: "react-firebase-cloud-mes-8332a.firebaseapp.com",
  projectId: "react-firebase-cloud-mes-8332a",
  storageBucket: "react-firebase-cloud-mes-8332a.appspot.com",
  messagingSenderId: "195062336675",
  appId: "1:195062336675:web:328d6f2e1fef9685bc0316",
  measurementId: "G-TNECM35R39",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound: (arg0: boolean) => void) => {
  return getToken(messaging, {
    vapidKey:
      "BIEPZ9-xHBiXpjMa3_9kEard5xH0Ad3aNxnH5RxCCNNIgQ9dPDDZXjvgJv06o_57JpfnZMBE8kCVR0AiVPjCaLw",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
