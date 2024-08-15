import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';


const Header = () => {
  const user = useSelector((state) => state.user.user.value);
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <header
      className={`header bg-white w-full flex justify-between items-center py-4 px-[10%] max-sm:px-0 max-h-16 transition-all duration-500 lg:max-h-full ${isExpanded && 'max-h-96'}`}>
      <div className="flex justify-between w-full max-sm:px-4 items-center">
        <div className="logo text-3xl font-bold w-max max-sm:w-full">{'<'}ProJet{' />'}</div>
        {user ? <div className='md:hidden'>
          <Link to={'/profile/me'} className='flex max-sm:flex-col gap-1 lg:gap-4 items-center '>
            <div className='border border-gray-200 hover:border-blue-400 duration-500 rounded-full p-[2px]'>
              <Avatar
                alt="User"
                src={user.picture}
                sx={{ width: '34px', height: '34px', fontSize: '20px' }}
              >{user.name[0]}</Avatar>
            </div>
          </Link>
        </div> : <div className='md:hidden'><Link to={'/login'}><Button variant='outlined' size='small'>Login</Button></Link></div>}
      </div>

      <div className="nav-links z-10 bg-white max-sm:fixed max-sm:bottom-0 max-sm:z-10 max-sm:w-full max-sm:border-t">
        <ul className="flex max-sm:py-3 max-sm:justify-evenly items-center lg:space-x-8 font-medium font-poppins text-gray-900">
          <li className='lg:hover:bg-slate-100 lg:py-2 lg:px-3 rounded-md text-center max-sm:text-xs'><Link to={'/'}>
            <div className='text-center hidden max-sm:block'>
              <HomeIcon />
            </div>
            <p>Home</p>
          </Link></li>
          <li className='lg:hover:bg-slate-100 lg:py-2 lg:px-3 rounded-md text-center max-sm:text-xs'><Link to={'/explore'}>
            <div className='text-center hidden max-sm:block'>
              <ExploreIcon />
            </div>
            <p>Explore</p>
          </Link></li>
          <li className='lg:hover:bg-slate-100 lg:py-2 lg:px-3 rounded-md text-center max-sm:text-xs'><Link to={'/upload'}>
            <div className='text-center hidden max-sm:block'>
              <CloudUploadIcon />
            </div>
            <p>Upload</p>
          </Link></li>
          {user ? <li className='max-sm:hidden'>
            <Link to={'/profile/me'} className='flex max-sm:flex-col gap-1 lg:gap-4 items-center '>
              <div className='border border-gray-200 hover:border-blue-400 duration-500 rounded-full p-[2px]'>
                <Avatar
                  alt="User"
                  src={user.picture}
                  sx={{ width: '34px', height: '34px', fontSize: '40px' }}
                >{user.name[0]}</Avatar>
              </div>
            </Link>
          </li> : <li><Link to={'/login'}><Button variant='outlined' size='small'>Login</Button></Link></li>}
          {/* {user && <li><Link to={`/profile/${user.id}`}>Profile</Link></li>} */}
        </ul>
      </div>
    </header>
  )
}

export default Header