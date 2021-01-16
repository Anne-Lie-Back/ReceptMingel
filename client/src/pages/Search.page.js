import bxSearch from '@iconify/icons-bx/bx-search';
import Hero from '../components/Hero';
import SearchView from '../components/SearchView';

const SearchPage = () => (
    <>
        <Hero 
            title = 'Sök Recept' 
            icon = {bxSearch} 
        />
        <SearchView/>
    </>
);

export default SearchPage;