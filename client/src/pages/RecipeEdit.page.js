import { styled } from 'styletron-react';
import THEME from '../config/theme';
import Hero from '../components/Hero';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
import RecipeTemplate from '../components/RecipeTemplate';
import SideMenu from '../components/SideMenu';

const ContentWrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '220px auto',
    gridTemplateRows: 'auto',
    width: '100%',
    height: '100%',
    backgroundColor: THEME.colors.white[0]
});

const RecipeEditPage = () => {

    return(
        <>
            <Hero 
                title = 'Mina Recept' 
                icon = {roundRestaurantMenu} 
            />
            <ContentWrapper>
                <SideMenu/>
                <RecipeTemplate/>
            </ContentWrapper>
        </>

    );
};

export default RecipeEditPage;