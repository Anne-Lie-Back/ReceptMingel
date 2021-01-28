import { useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from '../config/theme';
import media from '../config/media';

import { Icon } from "@iconify/react";
import bxSearch from '@iconify/icons-bx/bx-search';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
import bxBookReader from '@iconify/icons-bx/bx-book-reader';
import userAvatarFilledAlt from '@iconify/icons-carbon/user-avatar-filled-alt';
import AuthenticationContext from '../contexts/authentication/context';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
  });

const NavLink = styled(Link, {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 18px',
  textDecoration: 'none',

  "@media screen and (min-width: 600px)" : {
    padding: '10px 20px',
  },
})

const StyledIcon = styled(Icon, ({$active}) => ({
  fontSize: '40px',
  color: $active? THEME.colors.contrast[0] : THEME.colors.white[0],
  ':hover' : {
      color: THEME.colors.contrast[0]
  },

  [media.above.tablet] : {
    fontSize: '45px',
  }
}));

const UserIcon = styled(StyledIcon, ({$active}) => ({
  fontSize: '38px',
  color: $active? THEME.colors.contrast[0] : THEME.colors.white[0],

  [media.above.tablet] : {
    fontSize: '40px',
  }
}))

const MainNavbar = () => {
  const { isAuthenticated, user, isLoadingUser } = useContext(AuthenticationContext);
  const { pathname } = useLocation();
  let { slug } = useParams();

  return(
      <Wrapper>
        {/* If user is not logged in, they will not reach the navbar*/}
        {!isAuthenticated || isLoadingUser?
          null : 
          <>
            <NavLink to = '/search'>
              <StyledIcon icon={bxSearch} $active = {pathname === "/search" || pathname === `/search/${slug}` ? true: false}/>
            </NavLink>
            <NavLink to = '/recipe'>
              <StyledIcon icon={roundRestaurantMenu } $active = {pathname === "/recipe" || pathname === `/recipe/${slug}` ? true: false}/>
            </NavLink>
            <NavLink to = '/recipebook'>
              <StyledIcon icon={bxBookReader} $active = {pathname === "/recipebook" || pathname === `/recipebook/${slug}` ? true: false}/>
            </NavLink>
            <NavLink to={user._id && `/user/${user._id}`}>
              <UserIcon icon={userAvatarFilledAlt} $active = {pathname === `/user/${user._id}`}/>
            </NavLink>
          </>
        }
        
      </Wrapper>
  );
};

export default MainNavbar;