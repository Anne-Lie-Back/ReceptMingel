import { createContext } from 'react';
 
 const RecipeContext = createContext({
    isLoadingRecipe: true,
    recipesAll: [],
    recipesUser: [],
    deleteRecipe: () => {},
    getAllRecipes: () => {},
    getRecipeById: () => {},
    getRecipeByIsShared: () => {},
    getRecipesByAuthorId: () => {},
    getRecipesByIsPrivate: () => {},
    patchRecipe: () => {},
    setIsLoadingRecipe: () => {},
    updateRecipe: () => {},
  });

  export default RecipeContext;