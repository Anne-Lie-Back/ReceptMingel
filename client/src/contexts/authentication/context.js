import { createContext } from 'react';
 
 const AuthenticationContext = createContext({
    isAuthenticated: true,
    isLoading: true,
    user: null,
    login: (username, password) =>
      new Promise((resolve, reject) => {
        resolve("");
      }),
    logout: () => {},
/*     register: (user) =>
      new Promise((resolve, reject) => {
        resolve("");
      }), */
    //updateUser: (key, value) => {},
  });

  export default AuthenticationContext