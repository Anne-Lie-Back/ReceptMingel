import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import axios from '../../axios';
import media from '../../config/media';
import SearchInputArea from './SearchInputArea';
import ResultCard from './ResultCard';
import PartingStrip from '../PartingStrip';
import PopUpRecipe from './PopUpRecipe';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '3rem 0',

    [media.above.tablet] : {
        padding: '3rem 1rem',
    }
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
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResults] = useState([]);
    const [allRecipies, setAllRecipies] = useState([]);
    const [recipe, setRecipe] = useState(null);
    let history = useHistory();

    useEffect(() => {
        getAllRecipes()
    },[]);

    //Temprary solution until better backendsolution. Gets all recipes and filters out the private ones.
    //The user can then filter after suiting recipes
    //works well now when recipes ar not that many. 
    const getAllRecipes = async() => {
        try{
            let data = await axios.get('/recipes', { withCredentials: true })
            .then(({data}) => data);
            data = data.filter(i => i.isShared === true);
            setAllRecipies(data)
        }catch(error){
            console.log(error)
        }
    };

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

    const handleOnClick = searchInput => {
        setSearchTerm(searchInput);
    };
    
    //When User writes in filter input field. it makes both input and recipetitles to lowercase to make the search non case sensitive.
    //As for now the user can only search by title.
    useEffect(() => {
        const lowerCased = searchTerm.toLowerCase();
        const results = allRecipies.filter(recipe =>
        recipe.title.toLowerCase().includes(lowerCased));
        setSearchResults(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    //Redirects to new slug and gets the recipe for that slug
    const handleResultClick = (id) =>{
        console.log('id', id)
        getRecipeById(id);
        history.push(`/search/${id}`);
    };

     //When user closes popup the slug will be removed
    const handleClosePopUp = () => {
        history.push(`/search/`)
        getAllRecipes(searchInput)
        setPopUpOpen(false) 
    };

    return(
        <Wrapper>
            <SearchInputArea
                setSearchInput = {setSearchInput}   
                handleClick = {() => handleOnClick(searchInput)} 
            />
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
};
    

export default SearchView;