//import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styletron-react';
import MainNavbar from './MainNavbar';

const Wrapper = styled('div', {
    width: '100%',
    height: '80px',
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px'
})

const Headline = styled('h1', {
    color: 'darkblue'
})

const Header = () => {
    return(
        <Wrapper>
            <Link to = {'/'} style = {{textDecoration: 'none'}}>
                <Headline>ReceptMingel</Headline>
            </Link>
            <MainNavbar/>
        </Wrapper>
    )
}


export default Header;