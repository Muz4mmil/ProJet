import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ProjectForm from '../components/ProjectForm';
import AuthHelper from '../components/AuthHelper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CircularProgress } from '@mui/material';

const UploadProject = () => {
  const user = useSelector((state) => state.user.user.value);
  const navigate = useNavigate()

  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [],
    category: '',
    owner: user ? user.id : null,
    teamType: 'solo',
    teamMembers: [],
    isOrganisationProject: false,
    organisation: '',
    githubLink: '',
    hostedLink: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true)
    try {
      const token = Cookies.get('token');
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      formData.images.forEach((file, index) => {
        data.append('images', file);
      });
      data.append('category', formData.category);
      data.append('owner', formData.owner);
      data.append('teamType', formData.teamType);
      data.append('teamMembers', JSON.stringify(formData.teamMembers));
      data.append('isOrganisationProject', formData.isOrganisationProject);
      data.append('organisation', formData.organisation);
      data.append('githubLink', formData.githubLink);
      data.append('hostedLink', formData.hostedLink);

      console.log(data)

      await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          navigate(`/explore/project/${response.data._id}`)
        })
        .catch((error) => {
          console.log(error)
        });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    finally {
      setUploading(false)
    }
  };

  return (
    user ? (
      <>
        <div className='w-[80%] max-sm:w-[90%]  mx-auto flex max-sm:flex-col-reverse justify-between'>
          <div className=''>
            <h1 className='my-16 max-sm:my-10 text-3xl font-poppins font-medium'>Upload New Project</h1>
            <ProjectForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} uploading={uploading} type={'create'} />

            {uploading && (
              <div className='fixed top-0 left-0 h-full w-full bg-black bg-opacity-30 z-50 grid place-items-center overscroll-none'>
                <div className='w-80 text-center  shadow-lg bg-white p-5 py-3 rounded flex items-center gap-10'>
                  <div className={`mt-2`}>
                    <CircularProgress />
                  </div>
                  <p id='upload-helper' className='bg-white'>Uploading, Please wait</p>
                </div>
              </div>
            )}</div>
          <div className='lg:w-[50%] max-md:h-56  max-sm:mx-auto lg:h-full mt-40 max-sm:mt-10 flex items-center'>
            <img src="/assets/upload3.png" className='h-full ' alt="upload" />
          </div>
        </div >
      </>
    ) : (<AuthHelper />)
  )
}

export default UploadProject