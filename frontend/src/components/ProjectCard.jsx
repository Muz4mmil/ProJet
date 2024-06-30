import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { db } from '../firebase-configs';
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const ProjectCard = ({ project }) => {
  const user = useSelector((state) => state.user.user.value);;
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const unsubscribe = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);
      const docData = docSnap.data()
      const isPresent = docData.saved.includes(project.id)
      setIsSaved(isPresent)
    }
    unsubscribe()
  }, [])

  const handleSave = async () => {
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    const docData = docSnap.data()
    if (!isSaved) {
      await updateDoc(userDocRef, {
        ...docData,
        saved: [...docData.saved, project.id]
      })
    }
    else {
      const newSaved = docData.saved.filter((item) => item !== project.id)
      await updateDoc(userDocRef, {
        ...docData,
        saved: newSaved
      })
    }
    setIsSaved(!isSaved)
  }

  return (
    <Card sx={{ maxWidth: 345, height: '100%', position: 'relative', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}>
      <CardMedia
        component="img"
        height="140"
        image={project.projectImagesURLs[0] || '/assets/images.png'}
        alt="Project-image"
        className='object-cover h-[160px]'
      />

      <Link to={`/explore/project/${project.id}`} >
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