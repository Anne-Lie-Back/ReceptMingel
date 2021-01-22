import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import bxBookReader from '@iconify/icons-bx/bx-book-reader';
import Hero from '../components/Hero';
//import GridContentWrapper from '../components/GridContentWrapper';
//import SideMenu from '../components/SideMenu';
import RecipeBookView from '../components/RecipeBookView';
import AuthenticationContext from '../contexts/authentication/context';

const RecipeBookPage = () => {
    const {recipeBook, getRecipeBook, user} = useContext(AuthenticationContext);

    const [isLoading, setIsLoading] = useState(true);
    const [sharedRecipes, setSharedRecipes] = useState([]);
    const [recipe, setRecipe] = useState(null);

    const [userObject, setUserObject] = useState({
        username : user.username,
        firstName : user.firstName,
        lastName : user.lastName,
        image : user.image,
        userInfo : user.userInfo,
        recipeBook : user.recipeBook,
        imageURL: user.imageURL
    });

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
        getRecipeBook(user._id)
        setIsLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <Hero 
                title = 'Min Receptbok' 
                icon = {bxBookReader} 
            />
{/*                 <SideMenu/> */}
                <RecipeBookView
                    sharedRecipes = {sharedRecipes}
                    recipe = {recipe}
                    $style = {{width: '100%'}}
                    userObject = {userObject}
                    setUserObject = {setUserObject}
                />
        </>
    );

}

export default RecipeBookPage;