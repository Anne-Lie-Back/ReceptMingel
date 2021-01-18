import {useState} from 'react';
import axios from '../../axios';
import RecipeContext from './context';

const RecipeContextProvider = (props) => {
    const [recipesAll, setRecipesAll] = useState([]);
    //[recipeShared, setRecipeShares] = useState([]);
    const [recipesUser, setRecipesUser] = useState([]);

    const getAllRecipes = async() => {
        await axios
        .get('/recipes', { withCredentials: true })
        .then((res) => {
            setRecipesAll(res.data)
        });
    };

    const getRecipesByAuthor = async(author) => {
        await axios
        .get(`recipes/author/${author}`, { withCredentials: true })
        .then((res) => {
            console.log('res Author', res)
            setRecipesUser(res.data)
        });

    };

/*     const getRecipeById = async(id) => {

    } */

    return(
        <RecipeContext.Provider
            {...props}
            value={{
                recipesAll,
                recipesUser,
                getAllRecipes,
                getRecipesByAuthor,
                //register,
                //updateUser,
            }}
        />
    );


}

export default RecipeContextProvider;