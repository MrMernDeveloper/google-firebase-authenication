
import './App.css';
import app from './Firebase/Firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app)




function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handelGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
      console.error('error', error)
    })
  }
  const handelGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user)
        
      })
      .catch(error => {
      console.error('error', error)
    })
  }
  const handelGoogleSignOut = ()=>{
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(() => {
      setUser({})
    })
  }
  return (
    <div className="App">
      {
        user.uid ? <button onClick={handelGoogleSignOut}>Google Sign Out</button> : <>
          <button onClick={handelGoogleSignIn}>Google Sign In</button>
          <button onClick={handelGithubSignIn}>Github Sign In</button>
        </>
      }

      {
        user.uid && 
        <div>

          <h3>User:{user.displayName}</h3>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
   }
      
    </div>
  );
}

export default App;
