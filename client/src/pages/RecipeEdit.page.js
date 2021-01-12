import { styled } from 'styletron-react';
import THEME from '../config/theme';
import RecipeTemplate from '../components/RecipeTemplate';
import Hero from '../components/Hero';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';

const ContentWrapper = styled('div', {
    width: '100%'
});

const RecipeEditPage = () => {

    return(
        <>
            <Hero 
                title = 'Recept' 
                icon = {roundRestaurantMenu} 
            />
            <ContentWrapper>
                <RecipeTemplate/>
            </ContentWrapper>
        </>

    );
};

export default RecipeEditPage;