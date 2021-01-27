import { useContext, useEffect } from 'react';
import bxBookReader from '@iconify/icons-bx/bx-book-reader';
import Hero from '../components/Hero';
import RecipeBookView from '../components/RecipeBookView';
import AuthenticationContext from '../contexts/authentication/context';

const RecipeBookPage = () => {
    const {getRecipeBook, user} = useContext(AuthenticationContext);
    
    //TODO check if I need this now after bugproblem fixed?
    //Else it's for ensuring we get the latest recpebook from db, 
    //although it should be managed by the context now everytime the user changes.
    useEffect(() => { 
        getRecipeBook(user._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return(
        <>
            <Hero 
                title = 'Min Receptbok' 
                icon = {bxBookReader} 
            />
            <RecipeBookView
                $style = {{width: '100%'}}
            />
        </>
    );
}

export default RecipeBookPage;