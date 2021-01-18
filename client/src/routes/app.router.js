import {useContext} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

//TODO Import Protected routes and authentication check
import ProtectedRoute from "./protected.route";
import AuthenticationContext from "../contexts/authentication/context";

import StartPage from '../pages/Start.page';
import SearchPage from '../pages/Search.page';
import RecipeEditPage from '../pages/RecipeEdit.page';
import RecipeViewPage from '../pages/RecipeView.page';
import RecipeBookPage from '../pages/RecipeBook.page';
import UserPage from '../pages/User.page';

//TODO import some sort of authentication for logged in user
//Maybe need to fix some more dynamic routes when I start to fetch backend data
const AppRouter = () => {
    const { isAuthenticated, isLoadingUser, user } = useContext(AuthenticationContext);

    return(
    <Switch>
        <Route 
            exact path = '/' 
            render={(props) =>
                isAuthenticated && !isLoadingUser? <Redirect to={`/user/${user._id}`}/>  : <StartPage/>
            }
        />
        <ProtectedRoute exact path = '/search' component = {SearchPage} />
        <ProtectedRoute exact path = '/user/:id' component = {UserPage} />
        <ProtectedRoute exact path = '/recipebook' component = {RecipeBookPage} />
        <ProtectedRoute exact path = '/recipe-edit' component = {RecipeEditPage} />
        <ProtectedRoute exact path = '/recipe' component = {RecipeViewPage} />
    </Switch>
)};

export default AppRouter;