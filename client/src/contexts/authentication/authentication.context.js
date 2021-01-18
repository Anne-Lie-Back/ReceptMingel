import {useEffect, useState} from 'react';
import axios from '../../axios';
import AuthenticationContext from './context';

const AuthenticationContextProvider = (props) => {
    const [user, setUser] = useState(null);
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

    const login = async (username, password) => {

        await axios.post('/users/session/login', {username, password}, {withCredentials: true})
        .then((res) => {
            if(res.data.message){
                if (res.data.message === "Authenticated") {
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                    console.log('res.data.user', res.data.user)
                }
                return res.data.message
            };
        })
        .catch(error => console.log(error));

        console.log('user in context', user);

        return "Failed to log in";
    };

    const logout = async () => {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoadingUnauthorized(true);
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
                //register,
                //updateUser,
            }}
        />
    );
};

export default AuthenticationContextProvider;