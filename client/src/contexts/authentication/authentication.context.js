import {useEffect, useState} from 'react';
import axios from '../../axios';
import AuthenticationContext from './context';

const AuthenticationContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [recipeBook, setRecipeBook] = useState([]);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isLoadingUnauthorized, setIsLoadingUnauthorized] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function fetchData(){
            await axios
            .get('/users', { withCredentials: true })
            .then((res) => {
                if(res.data.message && res.data.message === "Authenticated"){
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                    setIsLoadingUser(false);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    setIsLoadingUnauthorized(true)
                };
            })
            .catch(error => console.log(error))
        };
        fetchData();
    },[]); 

    const removeRecipeBookItem = (list, id) => {
        const newList = list.filter((item) => item !== id);
        setRecipeBook(newList) 
    };

    const addRecipeBookItem = (listItem) => {
        const newItem = listItem;
        
        const newList = [...recipeBook, newItem];
        setRecipeBook(newList) 
    };

    const patchRecipeBook = async(id) => {
        await axios
        .patch(`/users/${id}`, { recipeBook: recipeBook})
        .then((res) => {
            console.log('bookPatch', res);
        })
        .catch(error => console.log(error))
    };

    const login = async (username, password) => {

        await axios
        .post('/users/session/login', {username, password}, {withCredentials: true})
        .then((res) => {
            if(res.data.message){
                if (res.data.message === "Authenticated") {
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                    setIsLoadingUser(false)
                } 
                return res.data.message
            };  
        })
    };
    
    const logout = async () => {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoadingUnauthorized(true);
        setIsLoadingUser(true);
        await axios.delete('users/session/logout',{ withCredentials: true })
    };

    //TODO move register to here?

    //TODO Update user here?

    return(
        <AuthenticationContext.Provider
            {...props}
            value={{
                user,
                isAuthenticated,
                isLoadingUser,
                isLoadingUnauthorized,
                login,
                logout,
                removeRecipeBookItem,
                addRecipeBookItem,
                patchRecipeBook,
                //register,
                //updateUser,
            }}
        />
    );
};

export default AuthenticationContextProvider;