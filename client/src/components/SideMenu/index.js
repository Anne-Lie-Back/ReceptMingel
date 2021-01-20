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



const SideMenu = ({ recipeList, setIsAdd, setIsEdit }) => (
        <Wrapper>
            <TypeIsRecipe recipeList = {recipeList} setIsAdd = {setIsAdd} setIsEdit = {setIsEdit}/>
        </Wrapper>
);

export default SideMenu;