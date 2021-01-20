import {useContext, useEffect, useState} from 'react';
import { styled } from 'styletron-react';
import THEME from './../../config/theme';

import { Icon } from "@iconify/react";
import roundStarOutline from '@iconify/icons-ic/round-star-outline';
import roundStarRate from '@iconify/icons-ic/round-star-rate';
import roundRadioButtonUnchecked from '@iconify/icons-ic/round-radio-button-unchecked';
import roundRadioButtonChecked from '@iconify/icons-ic/round-radio-button-checked';
import bxEdit from '@iconify/icons-bx/bx-edit';
import minusCircleOutline from '@iconify/icons-eva/minus-circle-outline';

import PartingStrip from '../PartingStrip';
import TopSection from './TopSection';
import IngredientSection from './IngredientSection';
import CookingStepsSection from './CookingStepsSection';
import BottomSection from './BottomSection';
import AuthenticationContext from '../../contexts/authentication/context';
import RecipeContext from'../../contexts/recipe/context'

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '3rem 0',
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1rem'
});

const SpaceBetweenWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
});

const HeadlineSmall = styled ('h4', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontSize: THEME.fontSizes.normal,
    fontWeight: 500,
    letterSpacing: '0.05rem',
});

const RecipeWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '812px',
    margin: '1rem 2rem'
});

const EditDeleteIcon = styled(Icon,{
    fontSize: '35px',
    color: THEME.colors.black[0],
    marginLeft: '1.5rem',

    ':hover' : {
        cursor: 'pointer',
        color: THEME.colors.contrast[0],
    }
});

const StarIcon = styled(Icon,({$isStarred})=> ({
    margin: '0 0.5rem 0 -0.3rem',
    fontSize: '40px',
    color: $isStarred ? 'gold' : THEME.colors.black[0],

    ':hover' : {
        cursor: 'pointer',
        color: $isStarred ? THEME.colors.black[0] : THEME.colors.contrast[0],
    }
}));

const SharedIcon = styled(Icon,({$isSharedRecipe})=> ({
    margin: ' 0 0.5rem 0 -0.2rem',
    fontSize: '30px',
    color: $isSharedRecipe ? 'ForestGreen' : THEME.colors.black[0],

    ':hover' : {
        cursor: 'pointer',
        color: THEME.colors.contrast[0],
    }
}));

const RecipeView = ({setIsEdit, isLoading, recipe, getRecipeById}) => {
    //TODO assign startvalue from DB - recipe instead
    const [isSharedRecipe, setIsShared] = useState(recipe.isShared);
    const [isStarred, setIsStarred] = useState(false);

    //TODO remove and lift, decide by PROP from parent
    // eslint-disable-next-line no-unused-vars
    const [isSessionUsersRecipe, setSessionUsersRecipe] = useState(false);

    const {user} = useContext(AuthenticationContext);
    const {patchRecipe, deleteRecipe} = useContext(RecipeContext)

    const handlePatchRecipe = (value) => {
        console.log('PATCH')
        patchRecipe(recipe._id, value)
        getRecipeById(recipe._id)
        setIsShared(!isSharedRecipe);
    }

    const handleDelete = () => {
        console.log('DELETE!')
    };

    //Transform for easier follow on where the different items are showing and are styled.
    const {
        title,
        preambleHTML,
        imageURL,
        portions,
        cookingTime,
        cookingSteps,
        difficulty,
        ingredients,
        mdsaCategories,
        author,
        // eslint-disable-next-line no-unused-vars
        isShared
    } = recipe; 

    return(
        <Wrapper>
            {isLoading? <p>is Loading</p>
            : 
            <RecipeWrapper>
                <FlexRow>
                    {isSessionUsersRecipe?
                        <>
                            <StarIcon 
                                $isStarred = {isStarred} 
                                icon={isStarred? roundStarRate : roundStarOutline} 
                                onClick = {() => setIsStarred(!isStarred)}
                            />
                            <HeadlineSmall> {isStarred? 'SPARAD I DIN RECEPTBOK':'SPARA I DIN RECEPTBOK'}</HeadlineSmall>
                        </>
                        :
                        <SpaceBetweenWrapper>  
                            <FlexRow $style = {{margin: 0}}>
                            <SharedIcon 
                                $isSharedRecipe = {isSharedRecipe} 
                                icon={isSharedRecipe ? roundRadioButtonChecked : roundRadioButtonUnchecked} 
                                onClick = {() => handlePatchRecipe(recipe.isShared? {"isShared" : false} : {"isShared" : true})}
                            />
                            <HeadlineSmall> {recipe.isShared? 'DELAD MED DINA VÄNNER':'FÄRDIG? DELA MED DINA VÄNNER'}</HeadlineSmall>
                            </FlexRow>
                            {user.username === author && 
                            <FlexRow $style = {{margin: 0}}>
                                <EditDeleteIcon
                                    icon = {minusCircleOutline}
                                    onClick = {handleDelete}
                                />
                                <EditDeleteIcon
                                    icon = {bxEdit}
                                    onClick = {() => setIsEdit(true)}
                                />
                            </FlexRow>
                            }
                        </SpaceBetweenWrapper>           
                    }
                </FlexRow>
                <PartingStrip width = '100%'/>
                <TopSection 
                    title = {title} 
                    description = {preambleHTML} 
                    image = {imageURL} 
                    difficulty = {difficulty} 
                    cookingTime = {cookingTime}
                />
                <PartingStrip width = '100%'/>
                <IngredientSection portions = {portions} ingredients = {ingredients}/>
                <PartingStrip width = "200px" />
                <CookingStepsSection cookingSteps = {cookingSteps}/>
                <PartingStrip width = "100%" />
                <BottomSection categories = {mdsaCategories} author = {author}/>
            </RecipeWrapper>
}
        </Wrapper>
    );
};

export default RecipeView;