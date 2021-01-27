import { useState } from 'react';
import { styled } from 'styletron-react';
import { Icon } from "@iconify/react";
import THEME from '../config/theme';
import Hero from '../components/Hero';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
import roundMenu from '@iconify/icons-ic/round-menu';
//import GridContentWrapper from '../components/GridContentWrapper';
import RecipeTemplate from '../components/RecipeTemplate';
import SideMenu from '../components/SideMenu';

const Wrapper = styled('div', {
    position: 'relative',
    width: '100%'
});

const StyledIcon = styled(Icon, {
    position: 'absolute',
    top: '1rem',
    backgroundColor: THEME.colors.primary[0],
    borderTopLeftRadius: '5px',
    borderBottomRightRadius: '5px',
    color: THEME.colors.white[0],
    fontSize: '40px',
    zIndex: 3,

    ':hover' : {
        color: THEME.colors.contrast[0],
    }
});


const RecipeEditPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <Hero 
                title = 'Recept' 
                icon = {roundRestaurantMenu} 
            />
            <Wrapper>
                <StyledIcon/>
                <SideMenu
                    setIsOpen = {setIsOpen}
                />
                <RecipeTemplate/>
            </Wrapper>
        </>

    );
};

export default RecipeEditPage;