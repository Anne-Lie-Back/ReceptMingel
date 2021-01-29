import bxSearch from '@iconify/icons-bx/bx-search';
import {Helmet} from "react-helmet";
import Hero from '../components/Hero';
import Header from '../Header';
import SearchView from '../components/SearchView';

const SearchPage = () => (
    <>
        <Helmet>
            <title>ReceptMingel - Sök Recept</title>
            <meta name="Här kan du söka efter nya recept som dina ReceptMingel-kompisar har lagt upp."/>
        </Helmet>
        <Header/>
        <Hero 
            title = 'Sök Recept' 
            icon = {bxSearch} 
        />
        <SearchView/>
    </>
);

export default SearchPage;