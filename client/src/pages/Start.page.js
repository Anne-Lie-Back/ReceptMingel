import { useState } from 'react'
import RegisterNewUser from '../components/startPage/RegisterNewUser'
import LogInUser from '../components/startPage/LogInUser'
import heroImage from '../assets/images/heroImage.jpg'

import { styled } from 'styletron-react';

const HeroWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '900px',
    backgroundImage: `url(${heroImage})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
})

const Headline = styled('h2', {
    width: '100%',
    margin: '15% 2rem 1rem 2rem',
    fontSize: '2.5rem',
    textAlign: 'center',
    fontStyle: 'italic',
    textShadow: '0 0 1px #ffffff'
})

const StartPage = () => {
    const [isLoggIn, setIsLoggedIn] = useState(true)

    return(
        <HeroWrapper>
            {isLoggIn?
                <>
                    <Headline>Här skall det stå något fint</Headline>
                    <LogInUser handleClick = {() => setIsLoggedIn(false)}/>
                </>
                :
                <RegisterNewUser handleClick = {() => setIsLoggedIn(true)}/>
            }
        </HeroWrapper>
    );
};

export default StartPage;