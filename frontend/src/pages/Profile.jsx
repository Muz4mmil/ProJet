import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout'
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import { Button } from '@mui/material';
import ProjectCard from '../components/ProjectCard'
import AuthHelper from '../components/AuthHelper';
import CardsContainer from '../components/CardsContainer'
import ProjectCardSkeleton from '../components/ProjectCardSkeleton'
import axios from 'axios';

const Profile = () => {
  const user = useSelector((state) => state.user.user.value);
  const [projects, setProjects] = useState([])
  const [tab, setTab] = useState('mine')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setProjects([])
    if (user) {
      if (tab == 'mine') {
        const unsubscribe = async () => {
          await axios.get(`${import.meta.env.VITE_API_URL}/api/projects?user=${user.id}`)
            .then(async (res) => {
              setProjects(res.data)
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => setIsLoading(false))
        }

        unsubscribe();
      }
      else if (tab == 'saved') {
        const unsubscribe = async () => {
          await axios.post(`${import.meta.env.VITE_API_URL}/api/projects/getSaved`, {
            saved: user.saved
          })
            .then(async (res) => {
              setProjects(res.data)
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => setIsLoading(false))
        }

        unsubscribe()
      }
    }
  }, [tab])


  return (
    user ? (
      <div className='w-[80%] mx-auto'>
        <div className="my-10 flex justify-between">
          <h1 className='text-3xl font-poppins font-medium'>Profile</h1>
          <Logout />
        </div>
        <div className='flex gap-16 max-sm:gap-10'>
          <div>
            <Avatar
              alt="User"
              src={user.picture}
              sx={{ width: '100px', height: '100px', fontSize: '40px' }}
            >{user.name[0]}</Avatar>
          </div>
          <div className="user-info">
            {user && (<>
              <h4 className='text-4xl font-bold'>{user.name}</h4>
              <h4 className='mt-2 break-all max-sm:text-xs'>{user.email}</h4>
            </>)}

            <div className='flex gap-2 item-center my-6'>
              <ShareIcon />
              <Button
                size='small'
                sx={{ width: 'max-content' }}
                onClick={(e) => {
                  navigator.clipboard.writeText(`https://projetapp.vercel.app/profile/${user.id}`);
                  e.target.innerHTML = 'Link Copied';
                  setTimeout(() => {
                    e.target.innerHTML = "Share Profile";
                  }, 1500)
                }}
              >
                Share Profile
              </Button>
            </div>
          </div>
        </div>

        <div className="projects">
          <div className="tabs my-16 flex gap-8 items-end">
            <div
              className={`cursor-pointer w-44 h-10 flex items-end font-poppins font-medium duration-100 ${tab == 'mine' ? 'text-black text-3xl max-sm:text-2xl' : 'text-slate-700 text-xl max-sm:text-lg'}`}
              onClick={() => setTab('mine')}
            >My Projects</div>
            <div
              className={`cursor-pointer w-28 h-10 flex items-end font-poppins font-medium duration-100 ${tab == 'saved' ? 'text-black text-3xl max-sm:text-2xl' : 'text-slate-700 text-xl max-sm:text-lg'}`}
              onClick={() => setTab('saved')}
            >Saved</div>
          </div>
          <div>
            {isLoading ?
              <ProjectCardSkeleton length={3} /> :
              <CardsContainer projects={projects} />
            }
          </div>
        </div>
      </div>
    ) : (<AuthHelper />)
  )
}

export default Profile
