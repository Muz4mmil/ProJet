import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';
import Cookies from 'js-cookie';
import { updateSaved } from '../features/user';


const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.value);;
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
      const isPresent = user && user.saved.includes(project._id)
      setIsSaved(isPresent)
  }, [])

  const handleSave = async () => {
    const token = Cookies.get('token')

    await axios.put(`${import.meta.env.VITE_API_URL}/api/users/save?id=${project._id}`, {},
      {
        headers: { Authorization: `Bearer ${token}`}
      }
    )
      .then((res) => {
        console.log(res.data)
        dispatch(updateSaved(res.data))
        setIsSaved(!isSaved)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Card sx={{ maxWidth: 345, height: '100%', position: 'relative', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}>
      <CardMedia
        component="img"
        height="140"
        image={project.images[0] || '/assets/images.png'}
        alt="Project-image"
        className='object-cover h-[160px]'
      />

      <Link to={`/explore/project/${project._id}`} >
        <CardContent className='relative' sx={{ position: 'relative' }}>
          <Typography gutterBottom variant="h5" component="div">
            {project.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >
            {project.description}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ position: 'absolute', top: 0, right: 0 }}>
        {user && <button onClick={handleSave} className='p-[6px] text-3xl flex item-center justify-center rounded-full bg-white'>
          {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </button>}


        {/* </Button> */}
      </CardActions>
    </Card>
  )
}

export default ProjectCard