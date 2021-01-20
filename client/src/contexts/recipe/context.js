import { createContext } from 'react';
 
 const RecipeContext = createContext({
    recipesAll: [],
    recipesUser: [],
    isLoadingRecipe: true,
    getAllRecipes: () => {},
    getRecipesByAuthorId: () => {},
    getRecipeByIsShared: () => {},
    getRecipeById: () => {},
    updateRecipe: () => {},
    patchRecipe: () => {},
    deleteRecipe: () => {},
    setIsLoadingRecipe: () => {}
  });

  export default RecipeContext;