import { createContext } from 'react';
 
 const AuthenticationContext = createContext({
    isAuthenticated: true,
    isLoadingUser: true,
    isLoadingUnauthorized: true,
    user: null,
    recipeBook: null,
    registerNewUser: (user) =>
    new Promise((resolve, reject) => {
      resolve("")
    }),
    login: (username, password) =>
      new Promise((resolve, reject) => {
        resolve("");
      }),
    logout: () => {},
    removeRecipeBookItem: () => {},
    addRecipeBookItem: () => {},
    patchRecipeBook: () => {},
    getRecipeBook: () => {},
    getSessionUser: () => {},
    updateUser: () => {}
/*    TODO, remove or insert?
      register: (user) =>
      new Promise((resolve, reject) => {
        resolve("");
      }), */
    //updateUser: (key, value) => {},
  });

  export default AuthenticationContext;