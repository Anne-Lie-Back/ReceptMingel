import AuthenticationContextProvider from './authentication/authentication.context';
import RecipeContextProvider from './recipe/recipe.contextProvider';

//Put all contexts here for easy Providing
const ApplicationContextProvider = ({ children }) => (
    
        <RecipeContextProvider>
            <AuthenticationContextProvider>
            {children}
            </AuthenticationContextProvider>
        </RecipeContextProvider>
);

export default ApplicationContextProvider;