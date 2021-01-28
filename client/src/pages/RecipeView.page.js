import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { styled } from 'styletron-react';
import { Icon } from "@iconify/react";
import THEME from '../config/theme';
import axios from '../axios';
import Hero from '../components/Hero';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
import roundMenu from '@iconify/icons-ic/round-menu';
import GridContentWrapper from '../components/GridContentWrapper';
import RecipeView from '../components/RecipeView';
import RecipeTemplate from '../components/RecipeTemplate';
import SideMenu from '../components/SideMenu';
import AuthenticationContext from '../contexts/authentication/context';

const Wrapper = styled('div', {
    position: 'relative',
    width: '100%',
    padding: '2rem 0'
});

const MenuIcon = styled(Icon, {
    position: 'absolute',
    top: '1rem',
    padding: '0.3rem',
    backgroundColor: THEME.colors.primary[0],
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    color: THEME.colors.white[0],
    fontSize: '60px',
    zIndex: 3,

    ':hover' : {
        color: THEME.colors.contrast[0],
        cursor: 'pointer',
    }
});

const LoadingText = styled('p', {
    height: '900px',
    padding: '1rem 2rem',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.large,
})

const RecipeViewPage = () => {
    const {user} = useContext(AuthenticationContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [usersRecipes, setUsersRecipes] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [inputValues, setInputValues] = useState({
        title: '',
        preambleHTML: '',
        image: '',
        portions: 0,
        cookingTime: '0-15min',
        difficulty: 'lätt',
        ingredients: [],
        cookingSteps: [],
        mdsaCategories: [],
        authorId: user._id,
        author: user.username,
        isShared: isEdit? recipe.isShared : false
    });
    
    

    console.log('user.recipeBook', user.recipeBook)

    //For getting ID to recipe so we can get it and display it
    let { slug } = useParams();

    //Gets all the users recipes and when it is done it sets loading to false
    //so we know for sure data isn't null before rerendering
    const getRecipesByAuthor = async(authorId) => {
        try{
            let data = await axios.get(`recipes/author/${authorId}`, { withCredentials: true })
            .then(({data}) => data);
            setUsersRecipes(data)
            if(!recipe) setRecipe(data[data.length - 1])
            setIsLoading(false)
        }catch(error){
            console.log(error)
        };
    };

    useEffect(() => {
        getRecipesByAuthor(user._id)
        window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('usersRecipe', usersRecipes)

    //Gets correct recipe from db by using url-slug and sets loading to false when fetching is done
    // so we know data isn't null on rendering
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

    //FilterResult to set which list should be sent in sideview
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    //When User writes in filter input field. it makes both input and recipetitles to lowercase to make the search non case sensitive.
    //As for now the user can only search by title.
    useEffect(() => {
        const lowerCased = searchTerm.toLowerCase();
        const results = usersRecipes.filter(recipe =>
            recipe.title.toLowerCase().includes(lowerCased)
        );

        setSearchResults(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    //Gets the recipe that matches slug when url changes or display users first recipe if slug undefined. 
    //When it is done it sets loading to true again when component has gotten their data
    useEffect(() => {
        if(slug) {
            getRecipeById(slug);
            setIsLoading(true);
        } else if(!slug) {
            setRecipe(usersRecipes[0]);
        }
        if(!slug) setRecipe(usersRecipes[usersRecipes.length - 1])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    return(
        <> 
            <Helmet>
                <title>ReceptMingel - Mina recept</title>
                <meta name="Här kan du skapa och jobba på dina recept När de är klara trycker du bara på dela-knappen för att ge de andra Minglarna åtkomst till ditt recept."/>
            </Helmet>
            <Hero 
                title = 'Mina Recept' 
                icon = {roundRestaurantMenu} 
            />
            <Wrapper>
                <MenuIcon icon={roundMenu} onClick = {() => setIsOpen(true)}/>
                    <SideMenu 
                        recipeList = {usersRecipes}
                        searchResults = {searchResults}
                        setIsAdd = {setIsAdd} 
                        isOpen = {isOpen} 
                        setIsOpen = {setIsOpen} 
                        setIsEdit = {setIsEdit}
                        handleChange = {(event) => handleChange(event)} 
                    />
                    {/* If no recipes yet, yser gets a little textmessage */}
                    {usersRecipes.length === 0 && isLoading ?
                        <>
                            {!isAdd? 
                                <p>Skapa ditt första recept med knappen i sidomenyn</p> 
                                :
                                <RecipeTemplate 
                                    setIsEdit = {setIsEdit}
                                    isEdit = {isEdit}
                                    setIsAdd = {setIsAdd}
                                    isAdd = {isAdd}
                                    getRecipesByAuthor = {getRecipesByAuthor} 
                                    inputValues = {inputValues} 
                                    setInputValues = {setInputValues}
                                    slug = {slug}
                                    getRecipeById = {getRecipeById}
                                    recipe = {recipe}
                                /> 
                                
                            } 
                        </>  
                        : 
                        <>
                            {/* If loading of data isn't done yet, user will se a loading-text, 
                            else we will check if user wants to edit/add a recipe or not and show correct view */}
                            {isLoading? <LoadingText>Bakar Recept...</LoadingText> :   
                                <>
                                    {isEdit || isAdd? 
                                        <RecipeTemplate 
                                            setIsEdit = {setIsEdit}
                                            isEdit = {isEdit}
                                            setIsAdd = {setIsAdd}
                                            isAdd = {isAdd}
                                            getRecipesByAuthor = {getRecipesByAuthor} 
                                            inputValues = {inputValues} 
                                            setInputValues = {setInputValues}
                                            //slug = {slug}
                                            getRecipeById = {getRecipeById}
                                            recipe = {recipe}
                                            slug = {slug}
                                        /> 
                                        : 
                                        <RecipeView 
                                            view = "RecipeView"
                                            setIsEdit = {setIsEdit}
                                            slug = {slug} 
                                            getRecipeById = {getRecipeById}
                                            getRecipesByAuthor = {getRecipesByAuthor}
                                            isLoading = {isLoading} 
                                            recipe = {recipe}
                                        />
                                    }
                                </>
                            } 
                        </>
                    }  
            </Wrapper>  
        </>
    );
};

export default RecipeViewPage;