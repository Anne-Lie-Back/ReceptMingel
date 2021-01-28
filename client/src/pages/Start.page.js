import { useState } from 'react';
import { styled } from 'styletron-react';
import {Helmet} from "react-helmet";
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
    fontFamily: THEME.fonts.special,
    color: THEME.colors.white[0],
    letterSpacing: '0.05rem',
    fontSize: '20px',
    textAlign: 'center',
    textShadow: '0 0 5px #000000',
    fontWeight: 400,

    [media.above.XSmobile] : {
        margin: '25% 2rem 1rem 2rem',
        fontSize: '30px',
    },

    [media.above.tablet] : {
        margin: '10% 2rem 1rem 2rem',
        fontSize: '45px',
    },
});

const DescHeadline = styled('h3', {
    width: '100%',
    padding: '2rem 2rem 1rem 1rem',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    colors: THEME.colors.black[0],
    textAlign: 'center',
    textShadow: '0 0 1px #ffffff',
    lineHeight: '180%',
    [media.above.tablet] : {
        fontSize: THEME.fontSizes.large
    },
})

const StartPage = () => {
    const [isLoggIn, setIsLoggedIn] = useState(true)
    const height = `${window.innerHeight}px`

    return(
        <HeroWrapper $height = {height}>
            <Helmet>
                <title>ReceptMingel - Startsida</title>
                <meta name="Here you can log in or create an account."/>
            </Helmet>
            {isLoggIn?
                <>
                    <Headline>En samlingsplats för Amatörkockar</Headline>
                    <LogInUser handleClick = {() => setIsLoggedIn(false)}/>
                    <DescHeadline>
                        Skapa egna recept i din egen takt och florera bland andra amatörkockars kreationer. 
                        <br/>Hittar du något du gillar? Spara receptet i din receptbok!
                    </DescHeadline>
                    
                </>
                :
                <RegisterNewUser handleClick = {() => setIsLoggedIn(true)}/>
            }
        </HeroWrapper>
    );
};

export default StartPage;