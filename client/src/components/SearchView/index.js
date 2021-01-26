import {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import axios from '../../axios';
import AuthenticationContext from '../../contexts/authentication/context';
import SearchInputArea from './SearchInputArea';
import ResultCard from './ResultCard';
import PartingStrip from '../PartingStrip';
import PopUpRecipe from './PopUpRecipe';
//import RecipeView from '../RecipeView';

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
    const [popUpOpen, setPopUpOpen] = useState(false)
    const [searchResult, setSearchResult] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const {getSessionUser, user} = useContext(AuthenticationContext);
    //const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);
    let history = useHistory();
    let slug = useParams();
    console.log('user', user)

    const getSearchResult = async(query) => {
        await axios
        .get(`/recipes/search/${query}`, { withCredentials: true })
        .then((res) => {
            setSearchResult(res.data)
        });
    };

    useEffect(() => {
        getSearchResult("banan")
        console.log('user._id', user._id)
        getSessionUser(user._id)
        if(slug) {
            getRecipeById(slug)
        }
    },[]);

    const getRecipeById = async(id) => {
        try{
            let data = await axios.get(`recipes/${id}`, { withCredentials: true })
            .then(({data}) => data);
            setRecipe(data)
            setPopUpOpen(true)
        }catch(error){
            console.log(error)
        }
    };

    const handleResultClick = (id) =>{
        getRecipeById(id)
        console.log('clicked!')
        history.push(`/search/${id}`)
    };

    const handleClosePopUp = () => {
        history.push(`/search/`)
        setPopUpOpen(false)
    }
    
    console.log(recipe)

    return(
    <Wrapper>
        <SearchInputArea/>
        {popUpOpen && 
            <PopUpRecipe recipe = {recipe} getRecipeById = {getRecipeById} handleClick = {handleClosePopUp}/>
        }
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
                handleClick = {() => handleResultClick(item._id)}
                />
            ))}
        </ResultArea>
    </Wrapper>
);
}
    

export default SearchView;