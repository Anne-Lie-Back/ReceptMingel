import { createContext } from 'react';
 
 const RecipeContext = createContext({
    recipesAll: [],
    recipesUser: [],
    getAllRecipes: () => {},
    getRecipeByAuthor: () => {},
    getRecipeByIsShared: () => {},
    getRecipeById: () => {},
    updateRecipe: () => {},
    patchRecipe: () => {},
    deleteRecipe: () => {}
    
    //editRecipe: () => {},
    //deleteRecipe: () => {}

    /* login: (username, password) =>
      new Promise((resolve, reject) => {
        resolve("");
      }),
    logout: () => {}, */
/*    TODO, remove or insert?
      register: (user) =>
      new Promise((resolve, reject) => {
        resolve("");
      }), */
    //updateUser: (key, value) => {},
  });

  export default RecipeContext;