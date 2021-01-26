import {useEffect, useState} from 'react';
import axios from '../../axios';
import AuthenticationContext from './context';

const AuthenticationContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [recipeBook, setRecipeBook] = useState([]);
    //const [editRecipeBook, setEditRecipeBook] = useState([]);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isLoadingBook, setIsLoadingBook] = useState(true)
    const [isLoadingUnauthorized, setIsLoadingUnauthorized] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function fetchData(){
        await axios
        .get('/users', { withCredentials: true })
        .then((res) => {
            if(res.data.message && res.data.message === "Authenticated"){
                setIsAuthenticated(true);
                setUser(res.data.user);
                console.log('res.data.user', res.data.user)
                setIsLoadingUser(false);
            } else {
                setIsAuthenticated(false);
                setUser(null);
                setIsLoadingUnauthorized(true)
            };
        })
        .catch(error => console.log(error))
    };
    console.log('user', user)

    useEffect(() => {
        fetchData()
    }, []);

    //This should be refactorized when authentication works
    const getSessionUser = async(id) => {
        try{
            let data = await axios.get(`/users/${id}`, { withCredentials: true })
            .then(({data}) => data);
            setUser(data)
        }catch(error){
            console.log(error)
        }
    };
        

    //TODO BUG? if update recipeBook doesn't work it may be this thing that needs to be somewhere, or remove !isLoadingUser
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
        .then((res) => {
            console.log('Updated user', res);
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
                user,
                isAuthenticated,
                isLoadingUser,
                isLoadingUnauthorized,
                registerNewUser,
                login,
                logout,
                removeRecipeBookItem,
                addRecipeBookItem,
                updateUser,
                recipeBook,
                getRecipeBook,
                getSessionUser,
                fetchData,
            }}
        />
    );
};

export default AuthenticationContextProvider;