import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import bxSearch from '@iconify/icons-bx/bx-search';
import Hero from '../components/Hero';
import GridContentWrapper from '../components/GridContentWrapper';
import SideMenu from '../components/SideMenu';
import RecipeBookView from '../components/RecipeBookView';
import AuthenticationContext from '../contexts/authentication/context';

const RecipeBookPage = () => {
    const {user} = useContext(AuthenticationContext);

    const [isLoading, setIsLoading] = useState(true);
    const [sharedRecipes, setSharedRecipes] = useState([]);
    const [recipe, setRecipe] = useState(null);

    let { slug } = useParams();

    const getRecipesByIsShared = async() => {
        await axios
        .get('recipes/public', { withCredentials: true })
        .then((res) => {
            setSharedRecipes(res.data);
            setIsLoading(false);
        });
    };

    useEffect(() => { 
        getRecipesByIsShared()
        setIsLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(slug) {
            getRecipeById(slug);
            setIsLoading(true);
        } /* else if(!slug) {
            setRecipe(usersRecipes[0]);
        } */
        /* if(!slug) setRecipe(usersRecipes[usersRecipes.length - 1]) */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

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

    return(
        <>
            <Hero 
                title = 'Min Receptbok' 
                icon = {bxSearch} 
            />
            <GridContentWrapper>
                <SideMenu/>
                <RecipeBookView
                    sharedRecipes = {sharedRecipes}
                    recipe = {recipe}

                />
            </GridContentWrapper>
        </>
    );

}

export default RecipeBookPage;