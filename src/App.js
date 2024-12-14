import React, { useEffect, useState } from 'react';
import './App.css';
import * as firebase from 'firebase/app';
import firebaseConf from './firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

firebase.initializeApp(firebaseConf); 

function App() {

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo:''
  });

  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
    .then(res=>{
      const credintial = GoogleAuthProvider.credentialFromResult(res);
      const {displayName, photoURL, email} = res.user;
      
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo:photoURL,
      };
      setUser(signedInUser);

      console.log(displayName, photoURL, email, credintial);
    }).catch(err => {
      console.log(err);
      console.log(err.message);
    });
  }

  const handleSignOut = () => {
    signOut(auth).then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo:''
      };
      setUser(signedOutUser);
      console.log(res);
    }).catch(error => {
      
    })
  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> : <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt='' />
        </div>
      }
    </div>
  );
}

export default App;
