import {useState} from 'react';
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
    const [searchResult, setSearchResult] = useState([]);
    const [recipe, setRecipe] = useState(null);
    let history = useHistory();

    //Search through database and get a list of results ordered by hitscore in return.
    const getSearchResult = async(query) => {
        await axios
        .get(`/recipes/search/${query}`, { withCredentials: true })
        .then((res) => {
            setSearchResult(res.data)
        });
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

    //Redirects to new slug and gets the recipe for that slug
    const handleResultClick = (id) =>{
        getRecipeById(id);
        history.push(`/search/${id}`);
    };

     //When user closes popup the slug will be removed
    const handleClosePopUp = () => {
        history.push(`/search/`)
        getSearchResult(searchInput)
        setPopUpOpen(false) 
    };

    return(
        <Wrapper>
            <SearchInputArea
                setSearchInput = {setSearchInput}   
                handleClick = {() => getSearchResult(searchInput)} 
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