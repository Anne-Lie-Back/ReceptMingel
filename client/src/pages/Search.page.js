import { styled } from 'styletron-react';
import THEME from '../config/theme';
import bxSearch from '@iconify/icons-bx/bx-search';
import GridContentWrapper from '../components/GridContentWrapper';
import Hero from '../components/Hero';
import SideMenu from '../components/SideMenu';
import SearchView from '../components/SearchView';

const SearchPage = () => (
        <>
            <Hero 
                title = 'Sök Recept' 
                icon = {bxSearch} 
            />
            <GridContentWrapper>
                <SideMenu/>
                <SearchView/>
            </GridContentWrapper>
        </>
);

export default SearchPage;