import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children, initial, animate, transition, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start(animate);
    } else {
      controls.start(initial);
    }
  }, [inView, controls, animate, initial]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const user = useSelector((state) => state.user.user.value);

  return (
    <div>
      <section id="hero"
        className="hero relative mt-2 h-max bg-gradient-to-b from-white to-[#d5e6ff] flex flex-col justify-center text-center items-center gap-6 p-8 pt-20 lg:p-24 lg:pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-info flex flex-col justify-center">
          <h1 className="font-poppins text-5xl lg:text-6xl font-bold text-[#1976d2]">Unleash Your Creativity <br /> with ProJet</h1>
          <h2 className="font-poppins text-3xl text-slate-600 mt-10 lg:text-4xl font-medium">Innovate Boldly. Build Uniquely & Show the World</h2>
          {/* <h5 className="text-lg text-center font-medium text-gray-600 mt-4">One place for all your Innovation</h5> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="buttons mt-5 flex gap-4">
          {user ?
            <Link to='/explore'>
              <Button variant='outlined' size='large' endIcon={<ArrowForwardIcon />}>Explore Projects</Button>
            </Link> :
            <>
              <Link to='/signup'>
                <Button variant='contained' size='large'>Signup</Button>
              </Link>
              <Link to='/explore'>
                <Button variant="outlined" size='large' endIcon={<ArrowForwardIcon />}>Explore Projects</Button>
              </Link>
            </>
          }
        </motion.div>
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-[#d5e6ff] rounded-[100%] -z-50"></div>

      </section>

      {/* 
      <div className="un-image my-lg:h-[300px]>

        < className='h-full w-full'img src="./assets/UN Goals.png" className="w-[90%] lg:w-[600px] mx-auto" alt="UN goals" />
      </div> */}


      <section
        className="about flex flex-col-reverse md:flex-row justify-around items-center gap-6 lg:gap-20 p-8 lg:w-4/5 mx-auto w-[calc(100vw-24px)] rounded-2xl my-6 mt-16"
      >
        <AnimatedSection
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:w-1/2 about-info"
        >
          <h2 className="text-3xl text-[#1976d2] lg:text-left text-center lg:text-5xl font-bold">
            Feeling Stuck in the Shadows?
          </h2>
          <p className="mt-5 text-lg font-poppins max-sm:text-center">
            Struggling to Showcase Your Projects? <br />
            Feeling Your Hard Work Goes Unnoticed? <br />
            Searching for Fresh, Innovative Ideas?
          </p>
        </AnimatedSection>
        <AnimatedSection
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0 }}>
        <div className="md:w-[360px] lg:w-[500px]">
          <img src="/assets/confuse.png" className="h-full w-full" alt="about" />
        </div>
        </AnimatedSection>
      </section>

      <section
        className="solution flex flex-col-reverse md:flex-row-reverse justify-around items-center gap-6 lg:gap-20 p-8 lg:w-4/5 mx-auto my-6"
      >
        <AnimatedSection
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:w-1/2 solution-info"
        >
          <h2 className="text-3xl text-[#1976d2] lg:text-left text-center lg:text-5xl font-bold">
            Give Your Work the Stage It Deserves.
          </h2>
          <p className="mt-5 text-lg font-poppins max-sm:text-center">
            <strong>Projet</strong> is here to help! We give your work the visibility it deserves, connect you with fellow innovators, and offer endless fresh ideas. Join Projet and turn challenges into opportunities!
          </p>
        </AnimatedSection>

        <AnimatedSection
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0 }}>
        <div className="md:w-[800px] lg:w-[400px]">
          <img src="/assets/solution.png" className="h-full w-full" alt="solution" />
        </div>
        </AnimatedSection>
      </section>

      <section
        className="about flex flex-col-reverse md:flex-row justify-around items-center gap-6 lg:gap-20 p-8 lg:w-4/5 mx-auto my-6"
      >
        <AnimatedSection
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:w-1/2 about-info"
        >
          <h2 className="text-3xl text-[#1976d2] lg:text-left text-center lg:text-5xl font-bold">
            Digitally Showcase Your Achievements
          </h2>
          <p className="mt-5 text-lg font-poppins max-sm:text-center">
            <strong>Projet</strong> lets you showcase your work digitally, making it easy for others to see your brilliance. Share your profile, highlight your successes, and stand out in a community of innovators. With Projet, your accomplishments won't just be noticed—they'll be celebrated!
          </p>
        </AnimatedSection>
        <AnimatedSection
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0 }}>
        <div className="lg:w-[500px]">
          <img src="/assets/showcase.png" className="h-full w-full" alt="showcase" />
        </div>
        </AnimatedSection>
      </section>

      <section
        className="solution flex flex-col-reverse md:flex-row-reverse justify-around items-center gap-6 lg:gap-20 p-8 lg:w-4/5 mx-auto mt-10"
      >
        <AnimatedSection
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:w-1/2 solution-info"
        >
          <h2 className="text-3xl text-[#1976d2] lg:text-left text-center lg:text-5xl font-bold">
            Collaborate, Innovate, Elevate
          </h2>
          <p className="mt-5 text-lg font-poppins max-sm:text-center">
            With <strong>Projet</strong>, you can connect with fellow creators, share ideas, and spark new innovations. Discover fresh perspectives, gain inspiration, and push the boundaries together. Join Projet and see how far you can go with the power of collaboration!
          </p>
        </AnimatedSection>
        <AnimatedSection
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0 }}>
        <div className="lg:w-[500px]">
          <img src="/assets/collab.png" className="h-full w-full" alt="collab" />
        </div>
        </AnimatedSection>
      </section>

      <section className="explore text-center mb-8">
        <Link to="/explore">
          <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
            Explore Projects
          </Button>
        </Link>
      </section>
    </div>
  )
}

export default Home