import { styled } from 'styletron-react';
import { Icon } from "@iconify/react";
import bxWindowClose from '@iconify/icons-bx/bx-window-close';
import THEME from '../../config/theme';
import RecipeView from '../RecipeView';

const Wrapper = styled('div', {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '890px',
    backgroundColor: THEME.colors.white[0],  
});

const ScrollWrapper = styled('div', ({$height}) => ({
    Position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: $height,
    overflowY: 'auto',
    zIndex: 4,

    '::-webkit-scrollbar' : { 
        width: '0.7rem',
        backgroundColor: THEME.colors.grey[0]
    },

    '::-webkit-scrollbar-thumb' : {
        borderRadius: '2px',
        border: `1px solid grey`,
        backgroundColor: THEME.colors.secondary[0]  
    },
}));

const StyledIcon = styled(Icon, {
    position: 'fixed',
    top: '20px',
    right:'30px',
    fontSize: '35px',
    color: THEME.colors.black[0],
    zIndex: 6,

    ':hover' : {
        color: THEME.colors.contrast[0],
        cursor: 'pointer'
    }
});

const PopUpRecipe = ({recipe, getRecipeById, handleClick}) => {
    //Sets hight for wrapper so content can have scroll auto.
    const height = `${window.innerHeight}px`

    return(
        <Wrapper>
            <StyledIcon icon={bxWindowClose} onClick = {handleClick}/>
                <ScrollWrapper $height = {height}>
                    <RecipeView 
                        getRecipeById = {getRecipeById} 
                        view = "SearchView" 
                        recipe = {recipe}></RecipeView>
                </ScrollWrapper>
        </Wrapper>
    );
};

export default PopUpRecipe;