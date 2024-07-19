import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import UploadProject from './pages/UploadProject'
import EditProject from './pages/EditProject'
import Project from './pages/Project'
import UserProfile from './pages/UserProfile'
import { login, logout } from './features/user'



function App() {

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      axios.get('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data)
          dispatch(login(res.data))
          setIsLoading(false)
        })
    } else setIsLoading(false)
  }, [dispatch])

  return (
    !isLoading ? <div className=' min-h-[100dvh] relative pb-20 max-sm:pb-24'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile/me' element={<Profile />} />
          <Route path='/profile/:uid' element={<UserProfile />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/upload' element={<UploadProject />} />
          <Route path='/edit/:projectId' element={<EditProject />} />
          <Route path='/explore/project/:projectId' element={<Project />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div> : <div>Loading...</div>
  )
}

export default App
