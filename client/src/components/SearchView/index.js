import {useEffect, useState} from 'react';
//import {useHistory, useParams} from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import axios from '../../axios';
import SearchInputArea from './SearchInputArea';
import ResultCard from './ResultCard';
import RecipeView from '../RecipeView';
import PartingStrip from '../PartingStrip';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '3rem 1rem'
});

const ResultArea = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    height: '100%',
    maxHeight: '1000px',
    margin: '1rem 0 0 0',
    overflow: 'auto',

    '::-webkit-scrollbar' : { 
        height: '0.6rem',
        backgroundColor: THEME.colors.grey[0]
    },

    '::-webkit-scrollbar-thumb' : {
        borderRadius: '2px',
        border: `1px solid grey`,
        backgroundColor: THEME.colors.secondary[0]
    }
});

const SearchView = () => {
    const [searchResult, setSearchResult] = useState([]);

    const getSearchResult = async(query) => {
        await axios
        .get(`/recipes/search/${query}`, { withCredentials: true })
        .then((res) => {
            setSearchResult(res.data)
        });
    };

    useEffect(() => {
        getSearchResult("banan")
    },[])

    console.log('searchResult', searchResult)

    return(
    <Wrapper>
        <SearchInputArea/>
        <ResultArea>
            {(searchResult && searchResult.length > 0) && <PartingStrip width = "100%"/>}
            {searchResult.map((item) => (
                <ResultCard
                key = {item._id}
                title = {item.title}
                imageURL = {item.imageURL}
                desc = {item.preambleHTML}
                difficulty = {item.difficulty}
                cookingTime = {item.cookingTime}
                />
            ))}
        </ResultArea>
    </Wrapper>
);
}
    

export default SearchView;