import {useContext} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

//TODO Import Protected routes and authentication check
import ProtectedRoute from "./protected.route";
import AuthenticationContext from "../contexts/authentication/context";

import StartPage from '../pages/Start.page';
import SearchPage from '../pages/Search.page';
import RecipeViewPage from '../pages/RecipeView.page';
import RecipeBookPage from '../pages/RecipeBook.page';
import UserPage from '../pages/User.page';
import Header from '../Header';

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
        <ProtectedRoute exact path = '/search/:slug' component = {SearchPage} />
        <ProtectedRoute exact path = '/user/:id' component = {UserPage} />
        <ProtectedRoute exact path = '/recipebook' component = {RecipeBookPage} />
        <ProtectedRoute exact path = '/recipebook/:slug' component = {RecipeBookPage} />
        <ProtectedRoute exact path = '/recipe/' component = {RecipeViewPage} />
        <ProtectedRoute exact path = '/recipe/:slug' component = {RecipeViewPage} />
        {/* If user enters a non-existing location-url they will be redirected to startPage */}
        <Route render={() => <Redirect to="/" />} />
        <Route path={["/:slug", "*"]} component={Header} />
    </Switch>
)};

export default AppRouter;