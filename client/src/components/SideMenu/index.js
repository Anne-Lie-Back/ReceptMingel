import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import { Icon } from "@iconify/react";
import bxWindowClose from '@iconify/icons-bx/bx-window-close';
import TypeIsRecipe from './TypeIsRecipe';


const Wrapper = styled('div', ({$isOpen})=> ({
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '240px',
    marginLeft: $isOpen? '0':'-240px',
    padding: '2rem',
    backgroundColor: THEME.colors.primary[0],
    zIndex: 5,
    transition: "0.8s ease-in all"
}));

const StyledIcon = styled(Icon, {
    fontSize: '40px',
    color: THEME.colors.white[0],
    margin: '0 0 1rem 0',

    ':hover' : {
        color: THEME.colors.contrast[0],
        cursor: 'pointer'
    }
});

const SideMenu = ({ recipeList, setIsAdd, setIsOpen, isOpen, setIsEdit, searchResults, handleChange }) => (
        <Wrapper $isOpen = {isOpen}>
            <div style = {{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <StyledIcon icon={bxWindowClose} onClick = {() => setIsOpen(false)}/>
            </div>
            <TypeIsRecipe 
                setIsOpen = {() => setIsOpen(false)}
                searchResults = {searchResults}
                recipeList = {recipeList} 
                setIsAdd = {setIsAdd} 
                setIsEdit = {setIsEdit}
                handleChange = {handleChange}
            />
        </Wrapper>
);

export default SideMenu;