import {useState} from 'react';
import axios from '../../axios';
import RecipeContext from './context';

// Some functional axios-functions, sometimes you can import the functions and use dem as they are,
//but sometimes when you need more controll over your state or a more custom function it is better to copy paste
//the function and use them where they need to be for full state-controll.

const RecipeContextProvider = (props) => {
    const [recipesAll, setRecipesAll] = useState([]);
    //[recipeShared, setRecipeShares] = useState([]);
    const [recipesUser, setRecipesUser] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [recipesPublic, setRecipesPublic] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [recipe, setRecipe] = useState(null);

    const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);

    //GETTERS

    const getAllRecipes = async() => {
        await axios
        .get('/recipes', { withCredentials: true })
        .then((res) => {
            setRecipesAll(res.data)
        });
    };

    const getRecipesByAuthorId = async(authorId) => {
        try{
            let data = await axios.get(`recipes/author/${authorId}`, { withCredentials: true })
            .then(({data}) => data);
            setRecipesUser(data)
            setIsLoadingRecipe(false)
        }catch(error){
            console.log(error)
        }
    };

    const getRecipesByIsShared = async() => {
        await axios
        .get('recipes/public', { withCredentials: true })
        .then((res) => {
            setRecipesPublic(res.data)
        });
    };

    const getRecipeById = async(id) => {
        try{
            let data = await axios.get(`recipes/${id}`, { withCredentials: true })
            .then(({data}) => data);
            setRecipe(data)
            setIsLoadingRecipe(false)
        }catch(error){
            console.log(error)
        }
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
    const patchRecipe = async(id, value) => {
        await axios
        .patch(`/recipes/${id}`, value, { withCredentials: true })
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
                isLoadingRecipe,
                getAllRecipes,
                getRecipesByAuthorId,
                getRecipesByIsShared,
                getRecipeById,
                updateRecipe,
                patchRecipe,
                deleteRecipe,
                setIsLoadingRecipe
            }}
        />
    );
};

export default RecipeContextProvider;