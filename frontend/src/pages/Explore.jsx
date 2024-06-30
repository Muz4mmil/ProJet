import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase-configs';
import CardsContainer from '../components/CardsContainer'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const Explore = () => {
  const [projects, setProjects] = useState([])

  const projectsRef = collection(db, 'projects')

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(projectsRef)
      const projects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProjects(projects)
    }
    fetchProjects();
  }, [])

  const user = useSelector((state) => state.user.user.value);;
  return (
    <div className='w-[80%] mx-auto'>
      <h1 className='my-16 text-3xl font-poppins font-medium'>Explore</h1>
      <CardsContainer projects={projects}/>
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