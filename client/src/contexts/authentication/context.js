import { createContext } from 'react';
 
 const AuthenticationContext = createContext({
    isAuthenticated: true,
    isLoadingUser: true,
    isLoadingUnauthorized: true,
    user: null,
    login: (username, password) =>
      new Promise((resolve, reject) => {
        resolve("");
      }),
    logout: () => {},
/*    TODO, remove or insert?
      register: (user) =>
      new Promise((resolve, reject) => {
        resolve("");
      }), */
    //updateUser: (key, value) => {},
  });

  export default AuthenticationContext;