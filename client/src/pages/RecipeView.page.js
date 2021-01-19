import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
//import { styled } from 'styletron-react';
//import THEME from '../config/theme';
import Hero from '../components/Hero';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
import GridContentWrapper from '../components/GridContentWrapper';
import RecipeView from '../components/RecipeView';
import RecipeTemplate from '../components/RecipeTemplate';
import SideMenu from '../components/SideMenu';
import RecipeContext from '../contexts/recipe/context';
import AuthenticationContext from '../contexts/authentication/context';

const RecipeViewPage = () => {
    // eslint-disable-next-line no-unused-vars
    const [isEdit, setIsEdit] = useState(false);
    //const [isLodin, setRecipe] = useState(null)
    const { getRecipesByAuthor,getRecipeById, recipe, recipesUser, isLoadingRecipe, setIsLoadingRecipe} = useContext(RecipeContext);
    const {user} = useContext(AuthenticationContext);

    let { slug } = useParams()
    //const location = useLocation();
    console.log('slug', slug)

    useEffect(() => {
        getRecipesByAuthor(user.username);
    }, [])

    console.log('recipesUser', recipesUser)

    useEffect(() => {
        if(slug) {
            getRecipeById(slug);
            setIsLoadingRecipe(true)
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]) 

    return(
        <>
            <Hero 
                title = 'Mina Recept' 
                icon = {roundRestaurantMenu} 
            />
            <GridContentWrapper>
                <SideMenu  recipeList = {recipesUser}  /* setIsEdit = {setIsEdit} *//>
                {isEdit? 
                    <RecipeTemplate setIsEdit = {setIsEdit} /* recipe = {recipe} */ /> 
                    : 
                    <RecipeView setIsEdit = {setIsEdit} slug = {slug} isLoading = {isLoadingRecipe} recipe = {recipe && recipesUser[0]}  /* recipeId = {slug} */ />
                }
            </GridContentWrapper>
        </>

    );
};

export default RecipeViewPage;