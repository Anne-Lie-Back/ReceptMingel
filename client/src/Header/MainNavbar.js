import { styled } from 'styletron-react';
import { Link, useHistory } from 'react-router-dom';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
})

const NavLink = styled(Link, {
    padding: '10px 20px',
    textDecoration: 'none',
    color: 'forestgreen'
})
const MainNavbar = () => {
    const history = useHistory();
    const navItems = [
        {
          label: "Search",
          route: "/search",
          onClick: () => history.push("/searchPage")
        },
        {
          label: "Recipes",
          route: "/recipe-edit",
          onClick: () => history.push("/recipe-edit")
        },
        {
          label: "RecipeBook",
          route: "/recipebook",
          onClick: () => history.push("/recipebook")
        },
        {
          label: "User",
          route: "/user",
          onClick: () => history.push("/userpage")
        }
      ]

    return(
        <Wrapper>
            {navItems.map((navItem) => (
                <NavLink to = {navItem.route}> 
                        {navItem.label}
                </NavLink>
            ))}
        </Wrapper>
    )
};

export default MainNavbar;