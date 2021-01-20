import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
//import { styled } from 'styletron-react';
//import THEME from '../config/theme';
import Hero from '../components/Hero';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
import GridContentWrapper from '../components/GridContentWrapper';
import RecipeView from '../components/RecipeView';
import RecipeTemplate from '../components/RecipeTemplate';
import SideMenu from '../components/SideMenu';
import RecipeContext from '../contexts/recipe/context';
import AuthenticationContext from '../contexts/authentication/context';

const RecipeViewPage = () => {
    const {user} = useContext(AuthenticationContext);
    // eslint-disable-next-line no-unused-vars
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [usersRecipes, setUsersRecipes] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [inputValues, setInputValues] = useState({
        title: '',
        preambleHTML: '',
        image: null,
        portions: 0,
        cookingTime: '0-15min',
        difficulty: 'lätt',
        ingredients: [],
        cookingSteps: [],
        mdsaCategories: [],
        author: user.username,
        isShared: false
    });
    //const [isLodin, setRecipe] = useState(null)
    //const { getRecipeById, recipe } = useContext(RecipeContext);
    

    let { slug } = useParams()
    //const location = useLocation();

    const getRecipesByAuthor = async(author) => {
        try{
            let data = await axios.get(`recipes/author/${author}`, { withCredentials: true })
            .then(({data}) => data);
            setUsersRecipes(data)
            setRecipe(data[0])
            setIsLoading(false)
        }catch(error){
            console.log(error)
        }
    };

    useEffect(() => { 
        getRecipesByAuthor(user.username)
        setIsLoading(true)
    }, [])

    const getRecipeById = async(slug) => {
        try{
            let data = await axios.get(`recipes/${slug}`, { withCredentials: true })
            .then(({data}) => data);
            setRecipe(data)
            setIsLoading(false)
        }catch(error){
            console.log(error)
        }
    };

    useEffect(() => {
        if(slug) {
            getRecipeById(slug);
            setIsLoading(true);
        } else if(!slug) {
            setRecipe(usersRecipes[0]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]) 

    return(
        <> 
            <Hero 
                title = 'Mina Recept' 
                icon = {roundRestaurantMenu} 
            />
            
                <GridContentWrapper>
                    
                        <SideMenu  recipeList = {usersRecipes} setIsEdit = {setIsEdit} />
                        {usersRecipes.length === 0 && isLoading ?
                            <>
                                {!isEdit? 
                                    <p>Skapa ditt första recept med knappen i sidomenyn</p> 
                                    :
                                    <RecipeTemplate 
                                        setIsEdit = {setIsEdit} 
                                        getRecipesByAuthor = {getRecipesByAuthor} 
                                        inputValues = {inputValues} 
                                        setInputValues = {setInputValues}
                                        getRecipeById = {getRecipeById}
                                        recipe = {recipe}
                                    /> 
                                    
                                } 
                            </>
                             
                            : 
                            <>
                                {isLoading? <p>is Loading...</p> :   
                                    <>
                                        {isEdit? 
                                            <RecipeTemplate 
                                                setIsEdit = {setIsEdit} 
                                                getRecipesByAuthor = {getRecipesByAuthor} 
                                                inputValues = {inputValues} 
                                                setInputValues = {setInputValues}
                                                getRecipeById = {getRecipeById}
                                                recipe = {recipe}
                                            /> 
                                            : 
                                            <RecipeView 
                                                setIsEdit = {setIsEdit} 
                                                slug = {slug} 
                                                isLoading = {isLoading} 
                                                recipe = {recipe} 
                                            />
                                        }
                                    </>
                                } 
                            </>
                        }  
                </GridContentWrapper>
            
        </>

    );
};

export default RecipeViewPage;