import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';

const ProjectCardSkeleton = ({ length }) => {
  return (
    <div className='w-[80vw] mx-auto'>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array(length).fill().map((_, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <Card sx={{ maxWidth: 345, height: '100%', position: 'relative', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}>
              <Skeleton variant="rectangular" width='100%' height={160} />
              <CardContent className='relative' sx={{ position: 'relative' }}>
                <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />

                <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default ProjectCardSkeleton