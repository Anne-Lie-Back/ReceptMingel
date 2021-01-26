import { useState } from 'react';
import { styled } from 'styletron-react';
import THEME from '../config/theme'
import media from '../config/media';
import RegisterNewUser from '../components/startPage/RegisterNewUser';
import LogInUser from '../components/startPage/LogInUser';
import heroImage from '../assets/images/heroImage.jpg';

const HeroWrapper = styled('div', ({$height}) =>  ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    minHeight: $height,
    backgroundImage: `url(${heroImage})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
}));

const Headline = styled('h2', {
    width: '100%',
    margin: '30% 2rem 1rem 2rem',
    padding: '0 2rem',
    fontFamily: THEME.fonts.text,
    fontSize: '25px',
    textAlign: 'center',
    textShadow: '0 0 1px #ffffff',

    [media.above.XSmobile] : {
        margin: '25% 2rem 1rem 2rem',
        fontSize: '30px',
    },

    [media.above.tablet] : {
        margin: '15% 2rem 1rem 2rem',
        fontSize: '40px',
    },
});

const StartPage = () => {
    const [isLoggIn, setIsLoggedIn] = useState(true)
    const height = `${window.innerHeight}px`

    return(
        <HeroWrapper $height = {height}>
            {isLoggIn?
                <>
                    <Headline>En samlingsplats för Amatörkockar</Headline>
                    <LogInUser handleClick = {() => setIsLoggedIn(false)}/>
                </>
                :
                <RegisterNewUser handleClick = {() => setIsLoggedIn(true)}/>
            }
        </HeroWrapper>
    );
};

export default StartPage;