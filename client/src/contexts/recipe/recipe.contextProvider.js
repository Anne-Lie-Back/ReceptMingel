import {useState} from 'react';
import axios from '../../axios';
import RecipeContext from './context';

const RecipeContextProvider = (props) => {
    const [recipesAll, setRecipesAll] = useState([]);
    //[recipeShared, setRecipeShares] = useState([]);
    const [recipesUser, setRecipesUser] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [recipesPublic, setRecipesPublic] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [recipe, setRecipe] = useState(null);

    //GETTERS

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

    const getRecipesByIsShared = async() => {
        await axios
        .get('recipes/public', { withCredentials: true })
        .then((res) => {
            console.log('res Public', res)
            setRecipesPublic(res.data)
        });
    };

    const getRecipeById = async(id) => {
        await axios.get(`recipes/${id}`, { withCredentials: true })
        .then((res) => {
            console.log('res Recipe', res)
            setRecipe(res.data)
        });
    };

    //PUT
    const updateRecipe = async(id, value) => {
        await axios
        .put(`/recipes/${id}`, {value}, { withCredentials: true })
        .then((res) => {
            console.log('resUpdate', res);
        })
        .catch(error => console.log(error))
    };

    //Patch
    const patchRecipe = async(id, key , value) => {
        await axios
        .patch(`/recipes/${id}`, { key: value}, { withCredentials: true })
        .then((res) => {
            console.log('resPatch', res);
        })
        .catch(error => console.log(error))
    };

    const deleteRecipe = async(id) => {
        await axios
        .delete(`/recipes/${id}`, { withCredentials: true })
    };

    return(
        <RecipeContext.Provider
            {...props}
            value={{
                recipesAll,
                recipesUser,
                recipesPublic,
                recipe,
                getAllRecipes,
                getRecipesByAuthor,
                getRecipesByIsShared,
                getRecipeById,
                updateRecipe,
                patchRecipe,
                deleteRecipe
            }}
        />
    );
};

export default RecipeContextProvider;