import {useEffect, useState} from 'react';
import axios from '../../axios';
import AuthenticationContext from './context';

const AuthenticationContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [recipeBook, setRecipeBook] = useState([]);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [isLoadingBook, setIsLoadingBook] = useState(true)
    const [isLoadingUnauthorized, setIsLoadingUnauthorized] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //FETCH FUNCTION DISABLED BECAUSE COOKIES ANS SESSIONS NOT WORKING ATM BECAUSE NETLIFY DON'T TRUST HEROKU's 3RD PARTY COOKIE
 /*  async function fetchData(){
        await axios
        .get('/users', { withCredentials: true })
        .then((res) => {
            if(res.data.message && res.data.message === "Authenticated"){
                setIsAuthenticated(true);
                setUser(res.data.user);
                getRecipeBook(res.data.user._id)
                setIsLoadingUser(false);
            } else {
                setIsAuthenticated(false);
                setUser(null);
                setIsLoadingUnauthorized(true)
            };
        })
        .catch(error => console.log(error))
    };

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  */

    //This should be refactorized when authentication works
    const getSessionUser = async(id) => {
        setIsLoadingUser(true);
        try{
            let data = await axios.get(`/users/${id}`, { withCredentials: true })
            .then(({data}) => data);
            setUser(data)
            setIsLoadingUser(false);
        }catch(error){
            console.log(error)
        }
    };

    //fetches and populates the updated user.recipeBook array when user is updated.
   useEffect(() => {
        (!isLoadingUser && user) && getRecipeBook(user._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]) 

    const getRecipeBook = async(id) => {
        try{
            let data = await axios.get(`/users/recipeBook/${id}`, { withCredentials: true })
            .then(({data}) => data);
            setRecipeBook(data.recipeBook[0].recipe)
            setIsLoadingBook(false)
        }catch(error){
            console.log(error)
        }
    }

    const removeRecipeBookItem = (list, id) => {
        const newList = list.filter((item) => item !== id);
        setUser({
            ...user,
            recipeBook: newList,
        })
    };

    const addRecipeBookItem = (listItem) => {
        const newItem = listItem;
        const newList = [...user.recipeBook, newItem];
        setUser({
            ...user,
            recipeBook: newList,
        })
    };

    //for updating both recipeBook and user
    const updateUser = async(id, inputValues) => {
        await axios
        .patch(`/users/${id}`, inputValues, {withCredentials: true})
        .then((data) => {
            getSessionUser(user._id);
        })
        .catch(error => console.log(error))
    };

    //Register new user
    const registerNewUser = async (inputValues) => {
        await axios
        .post('/users', inputValues)
        .then((res) => {
            if(res.data.message){
                if (res.data.message === "Authenticated") {
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                    setIsLoadingUser(false)
                } else {
                    console.log('user')
                    setIsAuthenticated(false);
                    setUser(null);
                    setIsLoadingUnauthorized(true)
                };
                return res.data.message
            }; 
        })
        .catch(error => console.log(error))  
    }

    const login = async (username, password) => {
        await axios
        .post('/users/session/login', {username, password}, {withCredentials: true})
        .then((res) => {
            if(res.data.message){
                if (res.data.message === "Authenticated") {
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                    setIsLoadingUser(false)
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    setIsLoadingUnauthorized(true)
                };
                return res.data.message
            };  
        })
        .catch(error => {
            console.log(error)
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
                addRecipeBookItem,
                //fetchData,
                getRecipeBook,
                getSessionUser,
                isAuthenticated,
                isLoadingUnauthorized,
                isLoadingUser,
                login,
                logout,
                recipeBook,
                registerNewUser,
                removeRecipeBookItem,
                updateUser,
                user,
            }}
        />
    );
};

export default AuthenticationContextProvider;