import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout'
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase-configs';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import { Button } from '@mui/material';
import ProjectCard from '../components/ProjectCard'
import AuthHelper from '../components/AuthHelper';
import CardsContainer from '../components/CardsContainer'

const Profile = () => {
  const user = useSelector((state) => state.user.user.value);
  console.log("State user: " + user)
  const [projects, setProjects] = useState([])
  const [tab, setTab] = useState('mine')

  const projectsRef = collection(db, 'projects')

  // useEffect(() => {
  //   setProjects([])
  //   if (user) {
  //     if (tab == 'mine') {
  //       const queryProjects = query(projectsRef, where('owner', '==', user.uid))
  //       const unsubscribe = onSnapshot(queryProjects, (snapshot) => {
  //         const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //         setProjects(projects)
  //       })
  //       return () => unsubscribe()
  //     }
  //     else if (tab == 'saved') {
  //       const userDocRef = doc(db, "users", user.uid);
  //       const unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
  //         const docData = docSnap.data()
  //         const savedProjects = docData.saved

  //         let projects = []
  //         for (const projectId of savedProjects) {
  //           const ProjectDocRef = doc(db, "projects", projectId);
  //           const ProjectdocSnap = await getDoc(ProjectDocRef);
  //           const ProjectdocData = ProjectdocSnap.data()
  //           if (ProjectdocData) {
  //             projects.push({ id: projectId, ...ProjectdocData })
  //           }
  //         }
  //         setProjects(projects)
  //       })
  //       return () => unsubscribe()
  //     }
  //   }
  // }, [tab])


  return (
    user ? (
      <div className='w-[80%] mx-auto'>
        <h1 className='my-10 text-3xl font-poppins font-medium'>Profile</h1>
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
              <ShareIcon/>
              <Button
                variant='outlined'
                size='small'
                sx={{ width: 'max-content' }}
                onClick={(e) => {
                  navigator.clipboard.writeText(`https://projet-app.web.app/profile/${user.id}`);
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

        <Logout />

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
            <CardsContainer projects={projects} />
          </div>
        </div>
      </div>
    ) : (<AuthHelper />)
  )
}

export default Profile