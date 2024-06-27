import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import UploadProject from './pages/UploadProject'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/explore' element={<Explore />}/>
        <Route path='/upload' element={<UploadProject />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
