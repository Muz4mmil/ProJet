import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  const user = useSelector((state) => state.user.user.value);;

  return (
    <div>
      <section id="hero"
        className="hero mt-2 h-max flex flex-col justify-center text-center items-center gap-6 p-8 py-20 lg:p-24 w-full">
        <div className="hero-info flex flex-col justify-center">
          <h1 className="font-poppins text-5xl lg:text-6xl font-bold">Welcome to ProJet</h1>
          <h2 className="font-poppins text-3xl text-gray-500 mt-4 lg:text-5xl font-medium">Get Innovate, Build Unique, ShowOff</h2>
          <h5 className="text-lg text-center font-medium text-gray-600 mt-4">One place for all your Innovation</h5>
        </div>

        <div className="buttons mt-2 flex gap-4">
          {user ?
            <Link to='/explore'>
              <Button variant='outlined' size='large' endIcon={<ArrowForwardIcon />}>Explore Projects</Button>
            </Link> :
            <>
              <Link to='/signup'>
                <Button variant='outlined'>Signup</Button>
              </Link>
              <Link to='/login'>
                <Button variant="contained">Login</Button>
              </Link>
            </>
          }
        </div>
      </section>
      {/* 
      <div className="un-image my-lg:h-[300px]>

        < className='h-full w-full'img src="./assets/UN Goals.png" className="w-[90%] lg:w-[600px] mx-auto" alt="UN goals" />
      </div> */}

      <section
        className="about flex flex-col-reverse lg:flex-row justify-around items-center gap-6 lg:gap-20 p-8 lg:p-20 w-[calc(100vw-24px)] rounded-2xl m-auto my-6">
        <div className="lg:w-1/2 about-info">
          <h2 className="text-3xl lg:text-left text-center lg:text-5xl font-bold">
            Facing Challenge in showcasing your Projects? <br />
            Limited Visibilty for your work?<br />
            Can't get Innovative ideas?
          </h2>
        </div>
        <div className="lg:w-[500px]">
          <img src="/assets/confuse.png" className='h-full w-full' alt="about" />
        </div>
      </section>

      <section
        className="solution flex flex-col-reverse lg:flex-row-reverse justify-around items-center gap-4 lg:gap-20 p-8 lg:p-20  my-6">
        <div className="lg:w-1/2 solution-info">
          <h2 className="text-3xl lg:text-left text-center lg:text-5xl font-bold">
            You are at right place <br />
            One Stop for all your Projects
          </h2>
          <p className="mt-5 text-lg font-poppins max-sm:text-center">
          <strong>Projet</strong> is here to help! We give your work the visibility it deserves, connect you with fellow innovators, and offer endless fresh ideas. Join Projet and turn challenges into opportunities!
          </p>
        </div>
        <div className="lg:w-[400px]">
          <img src="/assets/solution.png" className='h-full w-full' alt="solution" />
        </div>
      </section>

      <section
        className="about flex flex-col-reverse lg:flex-row justify-around items-center gap-6 lg:gap-20 p-8 lg:p-20  my-6">
        <div className="lg:w-1/2 about-info">
          <h2 className="text-3xl lg:text-left text-center lg:text-5xl font-bold">
            Showcase all your great Achievments Digitally. <br />
            Share your Profile and Stand-out <br />
          </h2>
          <p className="mt-5 text-lg font-poppins max-sm:text-center">
          <strong>Projet</strong> lets you showcase your work digitally, making it easy for others to see your brilliance. Share your profile, highlight your successes, and stand out in a community of innovators. With Projet, your accomplishments won't just be noticed—they'll be celebrated!
          </p>
        </div>
        <div className="lg:w-[500px]">
          <img src="/assets/showcase.png" className='h-full w-full' alt="showcase" />
        </div>
      </section>

      <section
        className="solution flex flex-col-reverse lg:flex-row-reverse justify-around items-center gap-6 lg:gap-20 p-8 lg:p-20  mt-10">
        <div className="lg:w-1/2 solution-info">
          <h2 className="text-3xl lg:text-left text-center lg:text-5xl font-bold">
            Collaborate and get Innovate from others<br />
          </h2>
          <p className="mt-5 text-lg font-poppins max-sm:text-center">
          With <strong>Projet</strong>, you can connect with fellow creators, share ideas, and spark new innovations. Discover fresh perspectives, gain inspiration, and push the boundaries together. Join Projet and see how far you can go with the power of collaboration!
          </p>
        </div>
        <div className="lg:w-[500px]">
          <img src="/assets/collab.png" a className='h-full w-full' lt="collab" />
        </div>
      </section>

      <section className="explore text-center mb-8">
        <Link to='/explore'>
          <Button variant='contained' size='large' endIcon={<ArrowForwardIcon />}>Explore Projects</Button>
        </Link>
      </section>

    </div>
  )
}

export default Home