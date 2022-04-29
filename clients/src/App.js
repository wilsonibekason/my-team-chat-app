import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection } from "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDAeDBNzizDpY9Td6lFd1vrTnZx-QoNl68",
  authDomain: "learnchat-app.firebaseapp.com",
  projectId: "learnchat-app",
  storageBucket: "learnchat-app.appspot.com",
  messagingSenderId: "105643957664",
  appId: "1:105643957664:web:dac3a53d3947f266b818c5",
  measurementId: "G-FGDFH3WDKS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header></header>
      <section>{user ? <ChatRoom /> : <Signin />}</section>
    </div>
  );
}

const Signin = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <button type="button" onClick={signInWithGoogle}>
      Sign in WIth Google
    </button>
  );
};

const signOut = () => {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign out</button>
  );
};

const ChatRoom = () => {
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <div></div>
    </>
  );
};

const ChatMessage = (props) => {
  const { text, uid } = props.message;

  return <p>{text}</p>;
};

export default App;
