import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from '../config/theme';
import Icons from '../config/icons';
import AuthenticationContext from '../contexts/authentication/context';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    //TODO remove background-color
    backgroundColor: '#00000010'
})

const NavLink = styled(Link, {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 20px',
  textDecoration: 'none',
})

const MainNavbar = () => {
  const { isAuthenticated, user, isLoadingUser} = useContext(AuthenticationContext);
  const { 
    Search,
    RecipeIcon,
    RecipeBook,
    User
   } = Icons

   console.log('user', isLoadingUser)

  return(
      <Wrapper>
        {!isAuthenticated || isLoadingUser?
        null : 
        <>
          <NavLink to = '/search'>
            <Search color = {THEME.colors.white[0]} size = '40px'/>
          </NavLink>
          <NavLink to = '/recipe'>
            <RecipeIcon color = {THEME.colors.white[0]} size = '45px'/>
          </NavLink>
          <NavLink to = '/recipebook'>
            <RecipeBook color = {THEME.colors.white[0]} size = '45px'/>
          </NavLink>
          <NavLink to={user._id && `/user/${user._id}`}>
            <User color = {THEME.colors.white[0]} size = '40px'/>
          </NavLink>
        </>
        }
        
      </Wrapper>
  );
};

export default MainNavbar;