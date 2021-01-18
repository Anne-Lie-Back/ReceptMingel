import {useState} from 'react';
import axios from '../../axios';
import RecipeContext from './context';

const RecipeContextProvider = (props) => {
    const [recipesAll, setRecipesAll] = useState([]);
    //[recipeShared, setRecipeShares] = useState([]);
    const [recipesUser, setRecipeUser] = useState([]);

    const getAllRecipes = async() => {
        await axios
        .get('/recipes', { withCredentials: true })
        .then((res) => {
            setRecipesAll(res.data)
            console.log(res.data);
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
                getAllRecipes
                //register,
                //updateUser,
            }}
        />
    );


}

export default RecipeContextProvider;