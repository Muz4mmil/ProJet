import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ProjectForm from '../components/ProjectForm';
import AuthHelper from '../components/AuthHelper';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const EditProject = () => {
  const user = useSelector((state) => state.user.user.value);;
  const navigate = useNavigate()
  const { projectId } = useParams()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectImagesURLs: [],
    category: '',
    owner: user ? user.id : null,
    teamType: 'solo',
    teamMembers: [],
    isOrganisationProject: false,
    organisation: '',
    githubLink: '',
    hostedLink: '',
  })

  useEffect(()=>{
    const unsubscribe = async () => {
      await axios.get(`https://projet-backend-blue.vercel.app/api/projects?id=${projectId}&user=${user.id}`)
        .then(async (res) => {
          setFormData(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
      }
  
      unsubscribe();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      await axios.put(`https://projet-backend-blue.vercel.app/api/projects/${projectId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log('Document Updated');
        setTimeout(() => {
          navigate(`/explore/project/${projectId}`)
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
      })

    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  return (
    user ? (
      <div className='w-[80%] mx-auto flex justify-between'>
        <div className=''>
          <h1 className='my-16 text-3xl font-poppins font-medium'>Edit Project</h1>
          <ProjectForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} type={'edit'}/>
        </div>
        <div className='hidden w-[50%] h-full mt-40 lg:flex items-center'>
          <img src="/assets/upload3.png" alt="upload" />
        </div>
      </div >
    ) : (<AuthHelper />)
  )
}

export default EditProject