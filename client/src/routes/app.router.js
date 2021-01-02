import {Route, Switch} from 'react-router-dom';

//TODO Import Protected routes and authentication check

import StartPage from '../pages/Start.page';
import SearchPage from '../pages/Search.page';
import RecipeEditPage from '../pages/RecipeEdit.page';
import RecipeViewPage from '../pages/RecipeView.page';
import RecipeBookPage from '../pages/RecipeBook.page';
import UserPage from '../pages/User.page';

//TODO import some sort of authentication for logged in user
//Maybe need to fix some more dynamic routes when I start to fetch backend data
const AppRouter = () => (
    <Switch>
        <Route exact path = '/' component = {StartPage}/>
        <Route exact path = '/search' component = {SearchPage} />
        <Route exact path = '/user' component = {UserPage} />
        <Route exact path = '/recipebook' component = {RecipeBookPage} />
        <Route exact path = '/recipe-edit' component = {RecipeEditPage} />
        <Route exact path = '/recipe' component = {RecipeViewPage} />
    </Switch>
);

export default AppRouter;