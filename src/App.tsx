import { useState, FormEvent } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCCYhS9dpSebtGJku9Z8ChC4-JCDinEV8U',
  authDomain: 'bissel-80103.firebaseapp.com',
  projectId: 'bissel-80103',
  storageBucket: 'bissel-80103.appspot.com',
  messagingSenderId: '177165913460',
  appId: '1:177165913460:web:2862d38a9cb36734f53021',
  measurementId: 'G-JKW3944MG9',
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">{user ? <ChatRoom /> : <SignIn />}</header>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    const uid = user?.uid;
    const photoURL = user?.photoURL;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
  };

  return (
    <div>
      <div>
        {messages && messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
      </div>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit" disabled={!formValue}>
          🍻
        </button>
      </form>
    </div>
  );
}

function ChatMessage(props: any) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="user-profile" />
      <p>{text}</p>
    </div>
  );
}

export default App;
