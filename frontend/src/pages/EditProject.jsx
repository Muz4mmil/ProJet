import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { doc, getDoc, updateDoc  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import ProjectForm from '../components/ProjectForm';
import { db } from '../firebase-configs';
import AuthHelper from '../components/AuthHelper';
import { useNavigate, useParams } from 'react-router-dom';

const EditProject = () => {
  const user = useSelector((state) => state.user.user.value);;
  const navigate = useNavigate()
  const { projectId } = useParams()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectImagesURLs: [],
    category: '',
    owner: user ? user.uid : null,
    teamType: 'solo',
    teamMembers: [],
    isOrganisationProject: false,
    organisation: '',
    githubLink: '',
    hostedLink: '',
  })

  const projectRef = doc(db, 'projects', projectId)

  useEffect(()=>{
    const unsubscribe = async () => {
        const project = await getDoc(projectRef);
        const projectData = await project.data()
        setFormData(projectData)
      }
  
      unsubscribe();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const docRef = await updateDoc(projectRef, formData);
      console.log('Document Updated');
      setTimeout(() => {
        navigate(`/explore/project/${projectId}`)
      }, 1000)
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  return (
    user ? (
      <div className='w-[80%] mx-auto flex justify-between'>
        <div className=''>
          <h1 className='my-16 text-3xl font-poppins font-medium'>Edit Project</h1>
          <ProjectForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
        </div>
        <div className='hidden w-[50%] h-full mt-40 lg:flex items-center'>
          <img src="/assets/upload3.png" alt="upload" />
        </div>
      </div >
    ) : (<AuthHelper />)
  )
}

export default EditProject