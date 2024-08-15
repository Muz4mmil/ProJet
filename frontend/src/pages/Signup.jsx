import React from 'react'
import SignUpForm from '../components/SignUpForm'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { login } from '../features/user'
import { useGoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignUp = async (name, email, password) => {
    await axios.post('https://projet-backend-blue.vercel.app/api/users/register', { name, email, password })
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
      await axios.post('https://projet-backend-blue.vercel.app/api/users/googleAuth', { googleAuthUser: user })
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
      <SignUpForm handleSignUp={handleSignUp} handleGoogleSignIn={handleGoogleAuth} />
    </div>
  )
}

export default Signup