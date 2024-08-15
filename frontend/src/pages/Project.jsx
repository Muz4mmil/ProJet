import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Cookies from 'js-cookie'

const Project = () => {
  const user = useSelector((state) => state.user.user.value);;
  const { projectId } = useParams()
  const [project, setProject] = useState()
  const [projectOwner, setProjectOwner] = useState()

  const navigate = useNavigate()

  const [openDialog, setOpenDialog] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = async () => {
      await axios.get(`https://projet-backend-blue.vercel.app/api/projects?id=${projectId}&user=${user.id}`)
        .then(async (res) => {
          setProject(res.data)

          await axios.get(`https://projet-backend-blue.vercel.app/api/users/user?uid=${res.data.owner}`)
            .then((res) => {
              setProjectOwner(res.data)
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    unsubscribe();
  }, [])

  const handleDelete = async () => {
    setDeleteLoading(true)
    const token = Cookies.get('token')
    await axios.delete(`https://projet-backend-blue.vercel.app/api/projects/${projectId}`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        console.log(res.data)
        setDeleteLoading(false)
        setOpenDialog(false)
      })
      .catch((error) => {
        console.log(error)
        setDeleteLoading(false)
      })

    navigate(-1)
  }


  return (
    <div className='lg:w-[80%] w-[90%] my-6 mx-auto'>
      {project && projectOwner ? (
        <>
          <div className="images max-w-max my-6 flex gap-4 overflow-x-scroll">
            {project.images.map((url, index) => (
              <img key={index} src={url} className='max-h-72 object-cover mb-2' />
            ))}
          </div>

          {projectOwner.id == user.id &&
            <div className='mt-6 flex gap-4'>
              <Link to={`/edit/${projectId}`}>
                <Button
                  size='small'
                  sx={{ width: 'max-content' }}
                  startIcon={<EditIcon />}
                >
                  Edit Project
                </Button>
              </Link>
              <Button
                size='small'
                sx={{ width: 'max-content' }}
                startIcon={<DeleteIcon />}
                onClick={() => setOpenDialog(true)}
                color="error"
              >
                Delete Project
              </Button>
              <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you wan't to delete this project?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This will delete all the information and photos related to this project.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpenDialog(false)}
                    disabled={deleteLoading}>Cancel</Button>
                  <Button
                    size="small"
                    onClick={handleDelete}
                    color="error"
                    disabled={deleteLoading}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          }

          <div className="info">
            <h1 className='my-4 text-3xl font-poppins font-medium'>{project.name}</h1>
            <div className='flex gap-5 items-center'>
              {projectOwner &&
                <Link to={`/profile/${projectOwner.id}`}>
                  <p className='flex items-center gap-2 hover:text-sky-700'><PersonIcon />{projectOwner.name || 'unknown'}</p>
                </Link>}
              <p>|</p>
              <p className=' flex items-center gap-2'><CategoryIcon />{project.category}</p>
            </div>
            <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>Description:</h5>
            <p className=''>{project.description}</p>
            {
              project.teamType == 'team' ? (<>
                <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>Team Members:</h5>
                <ol className='ml-10 list-decimal'>
                  {project.teamMembers.map((member) => (
                    <li>
                      <p>{member.name}</p>
                    </li>
                  ))}
                </ol>
              </>) : null
            }
            {
              project.isOrganisationProject && (<>
                <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>College / Organisation:</h5>
                <p>{project.organisation}</p>
              </>)
            }
            {
              (project.githubLink || project.githubLink) && (<>
                <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>Links:</h5>
                {project.hostedLink && (<div className='flex items-start mt-2'>
                  <p className='mb-2 flex items-center gap-2 whitespace-nowrap'><LinkIcon />Link : </p>
                  <a href={project.hostedLink.startsWith('https://') ? project.hostedLink : 'https://' + project.hostedLink} className='text-sky-700 ml-2 break-all' target='_blank'>{project.hostedLink}</a>
                </div>)}
                {project.githubLink && (<div className='flex items-start mt-2'>
                  <p className='mb-2 flex items-center gap-2 whitespace-nowrap'><GitHubIcon />Github : </p>
                  <a href={project.githubLink.startsWith('https://') ? project.githubLink : 'https://' + project.githubLink} className='text-sky-700 ml-2 break-all' target='_blank'>{project.githubLink}</a>
                </div>)}
              </>)
            }
            <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>Contact:</h5>
            <p className='mb-2 flex items-center gap-2'><AlternateEmailIcon />Email : {projectOwner.email}</p>

            <div className='flex gap-4 item-center mt-10'>
              <ShareIcon />
              <Button
                variant='outlined'
                size='small'
                sx={{ width: 'max-content' }}
                onClick={(e) => {
                  navigator.clipboard.writeText(`https://projet-app.web.app/explore/project/${projectId}`);
                  e.target.innerHTML = 'Link Copied';
                  setTimeout(() => {
                    e.target.innerHTML = "Share Project Link";
                  }, 1500)
                }}
              >
                Share Project Link
              </Button>
            </div>
          </div>
        </>) : (<>Loading...</>)}
    </div>
  )
}

export default Project