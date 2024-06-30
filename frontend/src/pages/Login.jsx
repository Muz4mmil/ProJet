import React from 'react'
import { setPersistence, signInWithEmailAndPassword, browserLocalPersistence, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { db, auth } from '../firebase-configs';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import SignInForm from '../components/SignInForm'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { login } from '../features/user'
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignIn = async (email, password) => {
    await axios.post('http://localhost:5000/api/users/login', { email, password })
      .then((res) => {
        const user = res.data
        Cookies.set('token', user.token)
        dispatch(login(user))
        navigate('/profile/me')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
  }

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (user) => {
      await axios.post('http://localhost:5000/api/users/googleAuth', { googleAuthUser: user })
      .then((res) => {
        const googleUser = res.data
        Cookies.set('token', googleUser.token)
        dispatch(login(googleUser))
        navigate('/profile/me')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async(result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        const usersRef = doc(db, 'users', user.uid)

        await setDoc(usersRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          saved: [],
          photoURL: user.photoURL
        })

        navigate('/profile/me')

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div>
      <SignInForm handleSignIn={handleSignIn} handleGoogleSignIn={handleGoogleAuth}/>
    </div>
  )
}

export default Login