import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <CircularProgress />
        </div>
    )
}

export default Loader