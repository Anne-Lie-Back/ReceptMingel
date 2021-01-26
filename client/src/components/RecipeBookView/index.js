import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { styled } from 'styletron-react';
import THEME from '../../config/theme';

import axios from '../../axios';
import AuthenticationContext from '../../contexts/authentication/context';

import RecipeWheel from '../RecipeWheel';
import RecipeView from '../RecipeView';
import InputField from '../inputField';

const Wrapper = styled('div', {
    width: '100%',
});

const FilterInput = styled(InputField, {
    width: '250px',
    padding: '0.5rem 1rem',
    margin: '1rem',
    backgroundColor: THEME.colors.grey[0],
    border: 'none',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
});

const DecorativeLine = styled('div', {
    width: '100%',
    height: '0.6rem',
    backgroundColor: THEME.colors.grey[0]
});

const RecipeBookView = ({userObject, setUserObject}) => {
    const {recipeBook} = useContext(AuthenticationContext);
    const [isLoading, setIsLoading] = useState(true);
    const [recipe, setRecipe] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    let { slug } = useParams();
    
    //FilterResult to set which list should be sent to recipeWheel
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    
    //When User writes in filter input field. it makes both input and recipetitles to lowercase to make the search non case sensitive.
    //As for now the user can only search by title.
    useEffect(() => {
        const lowerCased = searchTerm.toLowerCase();
        const results = recipeBook.filter(recipe =>
            recipe.title.toLowerCase().includes(lowerCased)
        );

        setSearchResults(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const getRecipeById = async(slug) => {
        try{
            let data = await axios.get(`recipes/${slug}`, { withCredentials: true })
            .then(({data}) => data);
            setRecipe(data)
            setIsLoading(false)
        }catch(error){
            console.log(error)
        };
    };

    useEffect(() => {
        if(slug) {
            getRecipeById(slug);
            setIsLoading(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    return(
        <Wrapper>
            <FilterInput 
                styling = "basic" 
                handleChange = {(event) => handleChange(event)} 
                placeholder = 'Sök i din receptbok här...'
            />
            <RecipeWheel 
                recipeList = {!searchResults || searchResults.length === 0? recipeBook : searchResults} 
                height = "255px" 
                bannerTitle = "Filter-resultat"
                slug = {slug}
                route = "/recipeBook/"
            />
            <DecorativeLine/>
            {recipe === null && !slug ?
                <p>Hoppas du hittar något smaskigt i din receptbok</p>
                :
                <>
                    {isLoading? 
                        <>
                            <p>Bakar recept...</p>
                        </>
                        :
                        <RecipeView 
                            view = "RecipeBook"
                            $style = {{margin: '1rem 0 3rem 0'}}
                            slug = {slug}
                            isLoading = {isLoading}
                            recipe = {recipe}
                        /> 
                    }
                </>
            }
             
        </Wrapper>
    )
};

export default RecipeBookView;