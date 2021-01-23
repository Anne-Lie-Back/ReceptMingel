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
    const [isAdd, setIsAdd] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [usersRecipes, setUsersRecipes] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [inputValues, setInputValues] = useState({
        title: null,
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
        isShared: isEdit? recipe.isShared : false
    });
    
    console.log('user.recipeBook', user.recipeBook)
    const [userObject, setUserObject] = useState({
        username : user.username,
        firstName : user.firstName,
        lastName : user.lastName,
        image : user.image,
        userInfo : user.userInfo,
        recipeBook : user.recipeBook,
        imageURL: user.imageURL
    });

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
            <Hero 
                title = 'Mina Recept' 
                icon = {roundRestaurantMenu} 
            />
            <GridContentWrapper>
                <SideMenu  recipeList = {usersRecipes} setIsAdd = {setIsAdd} setIsEdit = {setIsEdit}/>
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
                            {isLoading? <p>is Loading...</p> :   
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
                                            userObject = {userObject} 
                                            setUserObject = {setUserObject}
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