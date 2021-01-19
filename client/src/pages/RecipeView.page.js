import { useContext, useEffect, useState } from 'react';
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
    const { getAllRecipes, recipesAll, getRecipesByAuthor } = useContext(RecipeContext);
    const {user} = useContext(AuthenticationContext);

    useEffect(() => {
        //getAllRecipes();
        getRecipesByAuthor(user.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <>
            <Hero 
                title = 'Mina Recept' 
                icon = {roundRestaurantMenu} 
            />
            <GridContentWrapper>
                <SideMenu/>
                {isEdit? 
                    <RecipeTemplate setIsEdit = {setIsEdit}/> 
                    : 
                    <RecipeView setIsEdit = {setIsEdit}
                />}
                <RecipeView/>
            </GridContentWrapper>
        </>

    );
};

export default RecipeViewPage;