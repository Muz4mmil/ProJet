import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { storage } from '../firebase-configs'
import { db } from '../firebase-configs';
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { useNavigate } from 'react-router-dom';
import Loader from './Loader'
import LinearProgress from '@mui/material/LinearProgress';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUpload({ projectId }) {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [URLs, setURLs] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleFilesUpload = async (e) => {
    const files = e.target.files;
    setFiles(files)

    setIsUploading(true)
    let newURLs = []

    for (const file of files) {
      const storageRef = ref(storage, `projectImages/${projectId}/${file.name}`)
      const uploadTask = await uploadBytesResumable(storageRef, file);
      uploadTask.task.on('state_changed',
        (snapshot) => {

        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.task.snapshot.ref).then((downloadURL) => {
            // setFormData((prev) => ({
            //   ...prev,
            //   projectImagesURLs: [...prev.projectImagesURLs, downloadURL],
            // }))
            // URLs.push(downloadURL)
            newURLs.push(downloadURL)
            if (newURLs.length == files.length) {
              setURLs(newURLs)
              setIsSubmitDisabled(false)
              document.getElementById('upload-helper').innerHTML = 'Uploaded'
              document.getElementById('upload-helper').style.color = 'green'
            }
          });
        }
      );
    }

    // navigate(`/explore/project/${projectId}`)
  }

  const handleSubmit = async () => {
    if (URLs.length > 0) {
      const projectRef = doc(db, 'projects', projectId)
      await updateDoc(projectRef, {
        projectImagesURLs: URLs,
      })
      console.log(URLs);
      navigate(`/explore/project/${projectId}`)
    } else {
      alert('Select Images or skip')
    }
  }

  return (
    <div className='max-w-[400px]'>
      <h1 className='my-16 text-3xl font-poppins font-medium'>Upload Project Images</h1>
      <Button
        fullWidth
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
      // startIcon={<CloudUploadIcon />}
      >
        Select files
        <VisuallyHiddenInput required type="file" accept="image/*" multiple onChange={handleFilesUpload} />
      </Button>
      {isUploading && (
        <div className=''>
          <div className={`w-full mt-2 ${isSubmitDisabled ? 'block' : 'hidden'}`}>
            <LinearProgress />
          </div>
          <p id='upload-helper' className='mt-1 text-sm'>Uploading...</p>
        </div>
      )}
      <Button
        id='submit-btn'
        variant="contained"
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        sx={{ mt: '20px', float: 'right' }}
      // startIcon={<CloudUploadIcon />}
      >
        Submit
      </Button>
    </div>
  );
}