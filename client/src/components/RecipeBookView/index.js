import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import AuthenticationContext from '../../contexts/authentication/context';
import RecipeWheel from '../RecipeWheel';
import RecipeView from '../RecipeView';
import InputField from '../inputField';
import PartingStrip from '../../components/PartingStrip';

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
    const [filterInput, setFilterInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [recipe, setRecipe] = useState(null)

    let { slug } = useParams();

    console.log('recipeBook', recipeBook)
    
    //Filterinput passed on to RecipeWheel as prop
    const handleChange = (event) => {
        setFilterInput(event.target.value)
    };

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
        console.log('slug', slug)
        if(slug) {
            getRecipeById(slug);
            setIsLoading(true);
            console.log("runs!")
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
                recipeList = {recipeBook} 
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