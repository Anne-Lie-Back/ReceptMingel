import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import TypeIsRecipe from './TypeIsRecipe';


const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '240px',
    padding: '2rem',
    backgroundColor: THEME.colors.primary[0]
});



const SideMenu = ({type, recipeList}) => {
    const RecipesTest = ['Fisktacos', 'choklabollar','Chana masala','Gröt','Fisktacos', 'choklabollar','Chana masala','Gröt',]
    console.log('recipeList', recipeList)

    return(
        <Wrapper>
            <TypeIsRecipe recipeList = {recipeList}/>
        </Wrapper>
    );
};

export default SideMenu;