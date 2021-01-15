import { styled } from 'styletron-react';
import THEME from '../config/theme';
import bxSearch from '@iconify/icons-bx/bx-search';
import Hero from '../components/Hero';
import GridContentWrapper from '../components/GridContentWrapper';
import SideMenu from '../components/SideMenu';
import RecipeBookView from '../components/RecipeBookView';

const RecipeBookPage = () => (
        <>
            <Hero 
                title = 'Min Receptbok' 
                icon = {bxSearch} 
            />
            <GridContentWrapper>
                <SideMenu/>
                <RecipeBookView/>
            </GridContentWrapper>
        </>
);

export default RecipeBookPage;