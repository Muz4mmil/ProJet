import React from 'react'
import Grid from '@mui/material/Grid';
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom';
import Loader from './Loader';


const CardsContainer = ({ projects }) => {

    return (
        projects.length > 0 ? 
        <div className='w-[80vw] mx-auto'>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {projects.map((project, index) => (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        {project && <ProjectCard project={project} />}
                    </Grid>
                ))}
            </Grid>
        </div> : <div className='text-center'>No Projects Found</div>
    )
}

export default CardsContainer