import React from 'react'
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from '../firebase-configs';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { googleLogout } from '@react-oauth/google';
import { logout } from '../features/user';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    googleLogout();
    console.log('Sign-out successful');
    dispatch(logout)
    Cookies.remove('token')
    window.location.href = '/'
  }

  return (
    <div className=' ml-[164px] max-sm:ml-[140px]'>
      <Button  color="error" size='small' onClick={handleLogout} startIcon={<LogoutIcon />}>Logout</Button>
    </div>
  )
}

export default Logout