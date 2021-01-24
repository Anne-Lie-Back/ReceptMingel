import {useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from './../../config/theme';
import AuthenticationContext from '../../contexts/authentication/context';
import RecipeContext from '../../contexts/recipe/context';

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
    textTransform: 'uppercase'
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

const RecipeView = ({view, setIsEdit, isLoading, slug, getRecipeById, recipe, getRecipesByAuthor}) => {
    const {recipeBook, getRecipeBook, user, updateUser} = useContext(AuthenticationContext);
    const {patchRecipe, deleteRecipe} = useContext(RecipeContext);
    //isSharedRecipe helps to display correct icon
    const [isSharedRecipe, setIsShared] = useState(recipe.isShared);
    //isStarred helps to display correct icon
    const [isStarred, setIsStarred] = useState(false);
    console.log('recipeBook', recipeBook)
    /* const [userObject, setUserObject] = useState({
        username : user.username,
        firstName : user.firstName,
        lastName : user.lastName,
        image : user.image,
        userInfo : user.userInfo,
        recipeBook : recipeBook,
        imageURL: user.imageURL
    }); */
    
    let history = useHistory();
    
    /* const removeRecipeBookItem = async (id) => {
        console.log('REMOVE')
        const newList = userObject.recipeBook.filter((item) => item !== id);
        await setUserObject({
            ...userObject,
            recipeBook: newList,
        })
        setIsShared(false)
    }; */
/* 
    const addRecipeBookItem = (listItem) => {
        console.log('ADD')
        const newItem = listItem;
        const newList = [...userObject.recipeBook, newItem];
        setUserObject({
            ...userObject,
            recipeBook: newList,
        })
        setIsShared(true)
    }; */

    useEffect(() => {
        if (view === "RecipeView") getRecipeById(recipe._id)
        if(view === "RecipeBook")getRecipeBook(user._id)
    }, [view])

    useEffect(() => {
        const index = recipeBook.indexOf(x => x._id === recipe._id);
        index === -1? setIsStarred(true) : setIsStarred(false)
    }, [slug])
    
    //Patches recipe, gets the new recipe and changes icon
    const handlePatchRecipe = () => {
        let value = recipe.isShared? {"isShared" : false} : {"isShared" : true}
        console.log('value', value)
        patchRecipe(recipe._id, value)
        isSharedRecipe? setIsShared(false):setIsShared(true)
        //TODO test to move this to useEffect that listens to recipe.isShared
        //isSharedRecipe? removeRecipeBookItem(recipe._id) : addRecipeBookItem(recipe._id);
    };


    useEffect(() => {
        console.log('wiiii', recipe.isShared)
        setIsShared(recipe.isShared);
    }, [recipe.isShared])

    console.log('isShared', recipe.isShared)

    const handleStarRecipe = () => {
        //isStarred? removeRecipeBookItem(recipe._id) : addRecipeBookItem(recipe._id);
        getRecipeById(recipe._id)
        setIsStarred(!isStarred);
    }

    //Deletes recipe, updates sidemenu-list and redirects user to start-recipe-page
    const handleDelete = (id) => {
        const newList = user.recipeBook.filter((item) => item !== id);
        updateUser(user._id, {recipeBook : newList})
        deleteRecipe(id);
        getRecipesByAuthor(recipe.authorId);
        history.push('/recipe');
    };

    //Check if recipe already is saved in recipeBook
   /*  const checkIfAlreadyStarred = () => {
        const index =  recipeBook.findIndex(recipe._id)
        if (index > -1){
            return true
        }
        else if(index === -1) {
            return false
        }
    }; */

    //Transform for easier follow on where the different items are showing and are styled.
    //Keeps id as recipe._id to easier see type of id used
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
        authorId,
        // eslint-disable-next-line no-unused-vars
        isShared
    } = recipe; 

    return(
        <Wrapper>
            {/* Waiting for data to load before rendering */}
            {isLoading? <p> is Loading </p>
            : 
            <RecipeWrapper>
                <FlexRow>
                    {/* Renders different mini-headers depending on if there is a slug */}
                    {!slug? 
                        <HeadlineSmall style = {{fontWeight: 700}}> 
                            VÄLKOMMEN TILL DINA RECEPT! 
                        </HeadlineSmall> 
                        :
                        <>
                            {/* Renders different mini-headers depending on is session-user is the same as recipe-owner */}
                            {user._id !== authorId?
                                <>
                                    <StarIcon 
                                        $isStarred = {isStarred} 
                                        icon={isStarred? roundStarRate : roundStarOutline} 
                                        onClick = {() => handleStarRecipe(isStarred? {"isStarred" : false} : {"isStarred" : true})}
                                    />
                                    <HeadlineSmall> 
                                        {isStarred? 'SPARAD I DIN RECEPTBOK':'SPARA I DIN RECEPTBOK'}
                                    </HeadlineSmall>
                                </>
                                :
                                <SpaceBetweenWrapper>
                                    {view === "RecipeView" &&
                                        <>
                                            <FlexRow $style = {{margin: 0}}>
                                                <SharedIcon 
                                                    $isSharedRecipe = {isSharedRecipe} 
                                                    icon={isSharedRecipe ? roundRadioButtonChecked : roundRadioButtonUnchecked} 
                                                    onClick = {() => handlePatchRecipe()}
                                                />
                                                <HeadlineSmall> 
                                                    {isSharedRecipe? 'DELAD MED DINA VÄNNER' : 'FÄRDIG? DELA MED DINA VÄNNER'}
                                                </HeadlineSmall>
                                            </FlexRow>
                                            {/* Renders Edit and delete-icon if session-user is the same as recipe-owner*/}
                                            {user._id === authorId && 
                                                <FlexRow $style = {{margin: 0}}>
                                                    <EditDeleteIcon
                                                        icon = {minusCircleOutline}
                                                        onClick = {() => handleDelete(recipe._id)}
                                                    />
                                                    <EditDeleteIcon
                                                        icon = {bxEdit}
                                                        onClick = {() => setIsEdit(true)}
                                                    />
                                                </FlexRow> 
                                            }
                                        </>
                                    }
                                    {view === "RecipeBook" && 
                                        <HeadlineSmall> 
                                            DETTA ÄR DITT RECEPT
                                        </HeadlineSmall>
                                    }
                                    
                                </SpaceBetweenWrapper>           
                            }
                        </>
                    }  
                </FlexRow>
                <PartingStrip width = '100%'/>
                {!slug && 
                    <HeadlineSmall $style = {{marginTop: '0.5rem', fontSize: THEME.fontSizes.small}}> 
                        Ditt senast skapade recept: 
                    </HeadlineSmall>
                }
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