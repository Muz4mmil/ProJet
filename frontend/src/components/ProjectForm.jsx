import React from 'react'
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
import FileUpload from './FileUpload'

const ProjectForm = ({ formData, setFormData, handleSubmit }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
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
    <div className="form-box max-w-[400px]">
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
        <FormControl fullWidth>
          <Button type='submit' variant="contained" className='w-max' sx={{ my: 2, ml: 'auto' }}>Create Project</Button>
        </FormControl>
      </Box>
    </div>
  )
}

export default ProjectForm