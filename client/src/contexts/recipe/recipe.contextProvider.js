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

    const [isLoadingRecipe, setIsLoadingRecipe] = useState(true)

    //GETTERS

    const getAllRecipes = async() => {
        await axios
        .get('/recipes', { withCredentials: true })
        .then((res) => {
            setRecipesAll(res.data)
        });
    };

    const getRecipesByAuthor = async(author) => {
        try{
            let data = await axios.get(`recipes/author/${author}`, { withCredentials: true })
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
            console.log('res Public', res)
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
                getRecipesByAuthor,
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