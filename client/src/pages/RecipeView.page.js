import { styled } from 'styletron-react';
import THEME from '../config/theme';
import Hero from '../components/Hero';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
import GridContentWrapper from '../components/GridContentWrapper';
import RecipeView from '../components/RecipeView';
import SideMenu from '../components/SideMenu';

const RecipeViewPage = () => {
    return(
        <>
            <Hero 
                title = 'Mina Recept' 
                icon = {roundRestaurantMenu} 
            />
            <GridContentWrapper>
                <SideMenu/>
                <RecipeView/>
            </GridContentWrapper>
        </>

    );
};

export default RecipeViewPage;