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
    // eslint-disable-next-line no-unused-vars
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [usersRecipes, setUsersRecipes] = useState([]);
    const [recipe, setRecipe] = useState(null);
    //const [isLodin, setRecipe] = useState(null)
    //const { getRecipeById, recipe } = useContext(RecipeContext);
    const {user} = useContext(AuthenticationContext);

    let { slug } = useParams()
    //const location = useLocation();
    console.log('slug', slug)

    useEffect(() => {
        const getRecipesByAuthor = async(author) => {
            try{
                let data = await axios.get(`recipes/author/${author}`, { withCredentials: true })
                .then(({data}) => data);
                setUsersRecipes(data)
                setIsLoading(false)
            }catch(error){
                console.log(error)
            }
        };
        getRecipesByAuthor(user.username)
        setIsLoading(true)
    }, [])

    useEffect(() => {
        if(slug) {
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
                
                    <SideMenu  recipeList = {usersRecipes}   setIsEdit = {setIsEdit} />
                    {isEdit? 
                        <RecipeTemplate setIsEdit = {setIsEdit} /* recipe = {recipe} */ /> 
                        : 
                        <RecipeView setIsEdit = {setIsEdit} slug = {slug} isLoading = {isLoading} /* recipe = {recipe && recipesUser[0]} */  /* recipeId = {slug} */ />
                    }
            </GridContentWrapper>
        </>

    );
};

export default RecipeViewPage;