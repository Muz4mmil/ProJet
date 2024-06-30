import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const AuthHelper = () => {
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <h1 className="text-2xl">Login to Experience ProJet</h1>
            <div className="buttons mt-4 flex gap-4">
                <Link to='/signup'>
                    <Button variant='outlined'>Signup</Button>
                </Link>
                <Link to='/login'>
                    <Button variant="contained">Login</Button>
                </Link>
            </div>
        </div>
    )
}

export default AuthHelper