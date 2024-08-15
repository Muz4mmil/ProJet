import React from 'react'
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
    await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password })
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
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users/googleAuth`, { googleAuthUser: user })
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

  return (
    <div>
      <SignInForm handleSignIn={handleSignIn} handleGoogleSignIn={handleGoogleAuth}/>
    </div>
  )
}

export default Login