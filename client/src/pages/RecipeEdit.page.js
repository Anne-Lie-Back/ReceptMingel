//import { styled } from 'styletron-react';
//import THEME from '../config/theme';
import Hero from '../components/Hero';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
import GridContentWrapper from '../components/GridContentWrapper';
import RecipeTemplate from '../components/RecipeTemplate';
import SideMenu from '../components/SideMenu';

//TODO REMOVE FILE

const RecipeEditPage = () => {

    return(
        <>
            <Hero 
                title = 'Recept' 
                icon = {roundRestaurantMenu} 
            />
            <GridContentWrapper>
                <SideMenu/>
                <RecipeTemplate/>
            </GridContentWrapper>
        </>

    );
};

export default RecipeEditPage;