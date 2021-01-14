import { styled } from 'styletron-react';
import THEME from '../config/theme';
import Hero from '../components/Hero';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
import RecipeView from '../components/RecipeView';
import SideMenu from '../components/SideMenu';

const ContentWrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '220px auto',
    gridTemplateRows: 'auto',
    width: '100%',
    height: '100%',
    backgroundColor: THEME.colors.white[0]
});

const RecipeViewPage = () => {

    return(
        <>
            <Hero 
                title = 'Mina Recept' 
                icon = {roundRestaurantMenu} 
            />
            <ContentWrapper>
                <SideMenu/>
                <RecipeView/>
            </ContentWrapper>
        </>

    );
};

export default RecipeViewPage;