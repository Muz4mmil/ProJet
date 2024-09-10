import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import CardsContainer from '../components/CardsContainer'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import axios from 'axios'
import ProjectCardSkeleton from '../components/ProjectCardSkeleton';

const Explore = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = async () => {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`)
        .then((res) => {
          setProjects(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => setIsLoading(false))
    }

    unsubscribe()
  }, [])

  const user = useSelector((state) => state.user.user.value);;
  return (
    <div className='w-[80%] mx-auto'>
      <h1 className='my-16 text-3xl font-poppins font-medium'>Explore</h1>

      {isLoading ?
        <ProjectCardSkeleton length={3} /> :
        <CardsContainer projects={projects} />
      }
      <div className='fixed bottom-12 hidden lg:block right-10'>
        <Link to='/upload'>
          <Fab variant="extended" color="primary" aria-label="add">
            <AddIcon sx={{ mr: 1 }} />
            Upload
          </Fab>
        </Link>
      </div>
    </div>
  )
}

export default Explore