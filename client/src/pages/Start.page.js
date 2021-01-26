import { useEffect, useRef, useState } from 'react';
import { styled } from 'styletron-react';
import THEME from '../config/theme'
import RegisterNewUser from '../components/startPage/RegisterNewUser';
import LogInUser from '../components/startPage/LogInUser';
import heroImage from '../assets/images/heroImage.jpg';

const HeroWrapper = styled('div', ({$height}) =>  ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: $height,
    backgroundImage: `url(${heroImage})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
}));

const Headline = styled('h2', {
    width: '100%',
    margin: '15% 2rem 1rem 2rem',
    fontFamily: THEME.fonts.text,
    fontSize: '40px',
    textAlign: 'center',
    fontStyle: 'italic',
    textShadow: '0 0 1px #ffffff'
});

const StartPage = () => {
    const [isLoggIn, setIsLoggedIn] = useState(true)
    const height = `${window.innerHeight}px`
    console.log('window.innerHeight', window.innerHeight)

    return(
        <HeroWrapper $height = {height}>
            {isLoggIn?
                <>
                    <Headline>En samlingsplats Amatörkockar</Headline>
                    <LogInUser handleClick = {() => setIsLoggedIn(false)}/>
                </>
                :
                <RegisterNewUser handleClick = {() => setIsLoggedIn(true)}/>
            }
        </HeroWrapper>
    );
};

export default StartPage;