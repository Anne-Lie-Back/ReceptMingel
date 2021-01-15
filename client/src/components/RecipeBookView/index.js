import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import RecipeWheel from '../RecipeWheel';
import RecipeView from '../RecipeView';

const Wrapper = styled('div', {
    width: '100%',
});

const RecipeBookView = () => (
    <Wrapper>
        <RecipeWheel bannerTitle = "Filter-resultat"/>
        <RecipeView/>
    </Wrapper>
);

export default RecipeBookView;