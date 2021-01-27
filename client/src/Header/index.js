//import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from '../config/theme';
import MainNavbar from './MainNavbar';

const Wrapper = styled('div', {
    position: 'absolute',
    top: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem 0',

    //Edge case
    "@media screen and (min-width: 600px)" : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0 30px',
    }
});

const Headline = styled('h1', {
    fontFamily: THEME.fonts.special,
    fontSize: THEME.fontSizes.largeHeader,
    margin: '0 0 0 1.5rem',
    color: THEME.colors.white[0],
    letterSpacing: '0.05rem',
    textShadow: '0 0 2px black',
    fontWeight: 400,

    "@media screen and (min-width: 600px)" : {
        margin: 0,
    }
});

const Header = () => {
    return(
        <Wrapper>
            {/* TODO add redirect if user is logged in */}
            <Link to = {'/'} style = {{textDecoration: 'none'}}>
                <Headline>ReceptMingel</Headline>
            </Link>
            <MainNavbar/>
        </Wrapper>
    );
};

export default Header;