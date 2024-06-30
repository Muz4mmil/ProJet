import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Header = () => {
  const user = useSelector((state) => state.user.user.value);
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <header
      className={`header bg-white w-full flex justify-between items-center py-4 px-[10%] max-sm:px-0 max-h-16 transition-all duration-500 lg:max-h-full ${isExpanded && 'max-h-96'}`}>
      <div className="logo text-3xl font-bold w-max max-sm:text-center max-sm:w-full">{'<'}ProJet{' />'}</div>
      
      <div className="nav-links z-10 bg-white max-sm:fixed max-sm:bottom-0 max-sm:z-10 max-sm:w-full max-sm:border-t">
        <ul className="flex max-sm:py-3 gap-2 max-sm:justify-evenly items-center lg:space-x-8 font-medium font-poppins text-gray-900">
          <li  className=' max-sm:text-xs'><Link to={'/'}>
            <div className='text-center hidden max-sm:block'>
              <HomeIcon />
            </div>
            <p>Home</p>
          </Link></li>
          <li  className=' max-sm:text-xs'><Link to={'/explore'}>
            <div className='text-center hidden max-sm:block'>
              <ExploreIcon />
            </div>
            <p>Explore</p>
          </Link></li>
          <li  className=' max-sm:text-xs'><Link to={'/profile/me'}>
            <div className='text-center hidden max-sm:block'>
              <PersonIcon />
            </div>
            <p>Profile</p>
          </Link></li>
          {/* {user && <li><Link to={`/profile/${user.uid}`}>Profile</Link></li>} */}
          <li  className=' max-sm:text-xs'><Link to={'/upload'}>
            <div className='text-center hidden max-sm:block'>
              <CloudUploadIcon />
            </div>
            <p>Upload</p>
          </Link></li>
          {!user && <li><Link to={'/login'}><Button variant='outlined' size='small'>Login</Button></Link></li>}
        </ul>
      </div>
    </header>
  )
}

export default Header