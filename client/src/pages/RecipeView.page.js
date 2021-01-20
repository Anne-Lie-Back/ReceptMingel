import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import Hero from '../components/Hero';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
import GridContentWrapper from '../components/GridContentWrapper';
import RecipeView from '../components/RecipeView';
import RecipeTemplate from '../components/RecipeTemplate';
import SideMenu from '../components/SideMenu';
import AuthenticationContext from '../contexts/authentication/context';

const RecipeViewPage = () => {
    const {user} = useContext(AuthenticationContext);
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
        authorId: user._id,
        author: user.username,
        isShared: false
    });

    //For getting ID to recipe so we can get it and display it
    let { slug } = useParams()

    //Gets all the users recipes and when it is done it sets loading to false
    //so we know for sure data isn't null before rerendering
    const getRecipesByAuthor = async(authorId) => {
        try{
            let data = await axios.get(`recipes/author/${authorId}`, { withCredentials: true })
            .then(({data}) => data);
            setUsersRecipes(data)
            setRecipe(data[0])
            setIsLoading(false)
        }catch(error){
            console.log(error)
        }
    };

    console.log('usersRecipes', usersRecipes)

    //Gets all the recipes for user when component mounts, and when it is done it sets loading to true again when 
    //component has gotten their data
    useEffect(() => { 
        getRecipesByAuthor(user._id)
        setIsLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        }
    };

    //Gets the recipe that matches slug when url changes or display users first recipe if slug undefined. 
    //When it is done it sets loading to true again when component has gotten their data
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
                    {/* If no recipes yet, yser gets a little textmessage */}
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
                            {/* If loading of data isn't done yet, user will se a loading-text, 
                            else we will check if user wants to edit/add a recipe or not and show correct view */}
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