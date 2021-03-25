import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Image, Button } from 'react-native'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// firebase.initializeApp({
//     apiKey: "AIzaSyBUMluW2z9Zsga1pkecFk2F04DNofGGHLc",
//     authDomain: "wandered-off.firebaseapp.com",
//     projectId: "wandered-off",
//     storageBucket: "wandered-off.appspot.com",
//     messagingSenderId: "188616078574",
//     appId: "1:188616078574:web:4c4f4870b1aafdea986fff",
//     measurementId: "G-X0V5SWXKX8"
// });

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();

function App() {

  const [user] = useAuthState(auth);

  return (
    <View className="App">
        <ChatRoom />
    </View>
  );
}

// function SignIn() {

//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   }

//   return (
//     <>
//       <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
//       <p>Do not violate the community guidelines or you will be banned for life!</p>
//     </>
//   )

// }

// function SignOut() {
//   return auth.currentUser && (
//     <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
//   )
// }


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <View>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <Text ref={dummy}></Text>

    </View>

      <TextInput value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
      <Button title='Send' onPress={sendMessage} /*disabled={!formValue}*//>
  </>) 
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <View className={`message ${messageClass}`}>
      <Image source={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <Text>{text}</Text>
    </View>
  </>)
}

export default App