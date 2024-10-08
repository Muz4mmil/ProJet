import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
// import FileUpload from './FileUpload'
import imageCompression from 'browser-image-compression';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';


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

const ProjectForm = ({ formData, setFormData, handleSubmit, uploading, type }) => {

  const [isUploadingFiles, setIsUploadingFiles] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFilesChange = async (e) => {
    setIsUploadingFiles(true)
    // const options = {
    //   maxSizeMB: 0.2,
    //   maxWidthOrHeight: 1920,
    //   useWebWorker: true,
    // }

    // const compressedImages = []
    // for (const file of e.target.files) {
    //   const compressedFile = await imageCompression(file, options)
    //   compressedImages.push(compressedFile)
    //   console.log(file)
    // }

    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
    setIsUploadingFiles(false);
  }

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      teamMembers: updatedMembers
    }))
  }

  const handleAddMember = () => {
    if (formData.teamMembers.length == 0) {
      setFormData((prevData) => ({
        ...prevData,
        teamMembers: [...prevData.teamMembers, { name: '', email: '' }],
      }));
    }
    else if (formData.teamMembers[formData.teamMembers.length - 1].name !== ''
      && formData.teamMembers[formData.teamMembers.length - 1].email !== '') {
      setFormData((prevData) => ({
        ...prevData,
        teamMembers: [...prevData.teamMembers, { name: '', email: '' }],
      }));
    }
  };

  const handleSwitchChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      isOrganisationProject: e.target.checked,
    }))
  }

  return (
    <div className="relative form-box max-w-[400px]">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { my: 1 },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth>
          <TextField required id="outlined-basic" name='name' value={formData.name} onChange={handleChange} label="Project name" variant="outlined" />
          <TextField required
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
          {/* <FormControl sx={{ my: 2 }}>
            <FormLabel className='mt-4 mb-2'>Add Project Images</FormLabel>
            <FileUpload setFormData={setFormData} />
          </FormControl> */}

          <FormLabel id="demo-row-radio-buttons-group-label" className='mt-4'>Is it a Team Project?</FormLabel>
          <RadioGroup
            row
            required
            aria-labelledby="demo-row-radio-buttons-group-label"
            name='teamType'
            value={formData.teamType}
            onChange={handleChange}
          >
            <FormControlLabel value='team' control={<Radio />} label="Team" />
            <FormControlLabel value='solo' control={<Radio />} label="Solo" />
          </RadioGroup>
          {
            formData.teamType === 'team' ? (
              <div className='ml-8 mb-4'>
                <FormLabel id="team-members-label" className='mt-4 mb-4'>Team Members</FormLabel>
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className='flex gap-4'>
                    <TextField
                      required
                      id="outlined-basic"
                      name='name'
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      label="Name"
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      required
                      id="outlined-basic"
                      name='email'
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                      label="Email"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                ))}
                <div className='mt-2'>
                  <Button variant="outined" onClick={handleAddMember} size="small">+ Add</Button>
                </div>
              </div>
            ) : null
          }
        </FormControl >
        <div className="my-6">
          <FormLabel id="select-form-label" >Category</FormLabel>
          <div>
            <FormControl sx={{ my: 2, width: 260 }}>
              <InputLabel id="category-select-label">Select Category</InputLabel>
              <Select
                required
                aria-labelledby="select-form-label"
                labelId="category-select-label"
                id="demo-simple-select"
                name='category'
                value={formData.category}
                label="Select Category"
                onChange={handleChange}
                autoWidth
              >
                <MenuItem value={'Software & IT'}>Software & IT</MenuItem>
                <MenuItem value={'Mechanical'}>Mechanical</MenuItem>
                <MenuItem value={'Electrical & ELectronics'}>Electrical & Electronics</MenuItem>
                <MenuItem value={'Biotechnology'}>Biotechnology</MenuItem>
                <MenuItem value={'Chemical Engineering'}>Chemical Engineering</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <FormControl fullWidth>
          <div className="mb-4">
            <FormControlLabel
              control={<Switch name='isOrganisationProject' checked={formData.isOrganisationProject} onChange={handleSwitchChange} />}
              label="College/Organisation Project" />
            {
              formData.isOrganisationProject &&
              <TextField fullWidth id="outlined-basic" name='organisation' value={formData.organisation} onChange={handleChange} label="College/Organisation Name" variant="outlined" />
            }
          </div>
          <TextField id="outlined-basic" name='githubLink' value={formData.githubLink} onChange={handleChange} label="Project Github Link (optional)" variant="outlined" />
          <TextField id="outlined-basic" name='hostedLink' value={formData.hostedLink} onChange={handleChange} label="Project Hosted Link (optional)" variant="outlined" />
        </FormControl>

        <InputLabel id="image-select-label" className="mt-5 mb-3">Select Project Images {'(Photos or Screenshots)'}</InputLabel>
        {type === 'create' && <FormControl fullWidth>
          <Button
            fullWidth
            component="label"
            role={undefined}
            labelId="image-select-label"
            variant="outlined"
            tabIndex={-1}
          // startIcon={<CloudUploadIcon />}
          >
            Select files
            <VisuallyHiddenInput required type="file" accept="image/*" multiple onChange={handleFilesChange} />
          </Button>
        </FormControl>}
        
        {formData.images.length > 0 && <div className='flex gap-3 mt-3 pb-1 image overflow-x-scroll thin-scrollbar'>
          {formData.images.map((img, index) => (
            <img key={index} src={URL.createObjectURL(img)} className='h-20 w-auto rounded object-cover border' />
          ))}
        </div>}

        <FormControl fullWidth>
          <Button type='submit' disabled={uploading} variant="contained" className='w-max' sx={{ my: 2, ml: 'auto' }}>{type === 'edit' ? 'Save' : 'Create'} Project</Button>
        </FormControl>
      </Box>

      {isUploadingFiles && (
        <div className='absolute top-0 left-0 h-full w-full bg-white bg-opacity-70 grid place-items-center'>
          <div className='w-52 text-center'>
            <div className={`w-full mt-2`}>
              <LinearProgress />
            </div>
            <p id='upload-helper' className='mt-1 bg-white'>Uploading...</p>
          </div>
        </div>
      )}


    </div>
  )
}

export default ProjectForm