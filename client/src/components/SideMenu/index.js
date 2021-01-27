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

    ':hover' : {
        color: THEME.colors.contrast[0],
    }
});

const SideMenu = ({ recipeList, setIsAdd, setIsOpen, isOpen, setIsEdit }) => (
        <Wrapper $isOpen = {isOpen}>
            <div style = {{width: '100%', justifyContent: 'flexEnd'}}>
                <StyledIcon icon={bxWindowClose} onClick = {() => setIsOpen(false)}/>
            </div>
            <TypeIsRecipe recipeList = {recipeList} setIsAdd = {setIsAdd} setIsEdit = {setIsEdit}/>
        </Wrapper>
);

export default SideMenu;