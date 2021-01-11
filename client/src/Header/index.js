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
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '80px',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px'
});

const Headline = styled('h1', {
    fontFamily: THEME.fonts.special,
    fontSize: THEME.fontSizes.largeHeader,
    color: THEME.colors.white[0],
    letterSpacing: '0.05rem',
    textShadow: '0 0 2px black',
    fontWeight: 400
});

const Header = () => {
    return(
        <Wrapper>
            <Link to = {'/'} style = {{textDecoration: 'none'}}>
                <Headline>ReceptMingel</Headline>
            </Link>
            <MainNavbar/>
        </Wrapper>
    );
};


export default Header;