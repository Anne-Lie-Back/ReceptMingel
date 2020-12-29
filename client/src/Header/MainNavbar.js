import { styled } from 'styletron-react';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
})

const NavLink = styled('a', {
    margin: '10px 20px',
    textDecoration: 'none',
    color: 'forestgreen'
})
const MainNavbar = () => {
    const navItems = ['searchPage', 'recipePage', 'recipeBookPage', 'userPage'];
    
    return(
        <Wrapper>
            {navItems.map((navItem) => (
                <NavLink>{navItem}</NavLink>
            ))}
        </Wrapper>
    )
};

export default MainNavbar;