import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Logout from '../components/Logout'
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase-configs';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import ProjectCard from '../components/ProjectCard'
import AuthHelper from '../components/AuthHelper';
import CardsContainer from '../components/CardsContainer'
import { Button } from '@mui/material';

const UserProfile = () => {
  const user = useSelector((state) => state.user.user.value);;
  const { uid } = useParams()
  const [projects, setProjects] = useState([])
  const [viewUser, setViewUser] = useState()

  const projectsRef = collection(db, 'projects')

  useEffect(() => {
    const userDocRef = doc(db, "users", uid);
    const getUser = onSnapshot(userDocRef, (docSnap) => {
      const userData = docSnap.data()
      console.log(userData);
      setViewUser(userData)
    })

    const queryProjects = query(projectsRef, where('owner', '==', uid))
    const unsubscribe = onSnapshot(queryProjects, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setProjects(projects)
    })
    return () => {getUser(); unsubscribe();}

  }, [])


  return (
    viewUser ? (
      <div className='w-[80%] mx-auto'>
        <h1 className='my-10 text-3xl font-poppins font-medium'>Profile</h1>
        <div className='flex gap-16 max-sm:gap-10'>
          <div>
            <Avatar
              alt="user"
              src={viewUser.photoURL}
              sx={{ width: '100px', height: '100px', fontSize: '40px' }}
            >{viewUser.displayName[0]}</Avatar>
          </div>
          <div className="user-info">
            {viewUser && (<>
              <h4 className='text-4xl font-bold'>{viewUser.displayName}</h4>
              <h4 className='mt-2 break-all max-sm:text-xs'>{viewUser.email}</h4>
            </>)}

            <div className='flex gap-2 item-center my-6'>
              <ShareIcon/>
              <Button
                variant='outlined'
                size='small'
                sx={{ width: 'max-content' }}
                onClick={(e) => {
                  navigator.clipboard.writeText(`https://projet-app.web.app/profile/${viewUser.uid}`);
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
              className={`cursor-pointer w-44 h-10 flex items-end font-poppins font-medium duration-100 text-black text-3xl`}
            >Projects</div>
          </div>
          <div>
            <CardsContainer projects={projects} />
          </div>
        </div>
      </div>
    ) : (<div className='w-full text-center mt-40 font-bold text-gray-700 text-xl'>
      Loading...
    </div>)
  )
}

export default UserProfile