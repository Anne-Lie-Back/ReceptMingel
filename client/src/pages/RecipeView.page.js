import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
    
    const { getAllRecipes, recipesAll, getRecipesByAuthor, recipesUser, getRecipeById, recipe } = useContext(RecipeContext);
    const {user} = useContext(AuthenticationContext);

    let { slug } = useParams()
    //const location = useLocation()

    useEffect(() => {
        //getAllRecipes();
        getRecipesByAuthor(user.username);
        //setDisplayRecipe(recipesUser[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(slug) {
            getRecipeById(slug);
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
                <SideMenu  recipeList = {recipesUser} />
                {isEdit? 
                    <RecipeTemplate setIsEdit = {setIsEdit} recipe = {recipe}/> 
                    : 
                    <RecipeView setIsEdit = {setIsEdit}   recipe = {recipe && recipesUser[0]}/>
                }
            </GridContentWrapper>
        </>

    );
};

export default RecipeViewPage;