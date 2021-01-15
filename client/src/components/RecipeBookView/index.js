import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import RecipeWheel from '../RecipeWheel';

const Wrapper = styled('div', {
    width: '100%',
    backgroundColor: 'pink'
});

const RecipeBookView = () => (
    <Wrapper>
        <RecipeWheel bannerTitle = "Filter-resultat"/>
    </Wrapper>
);

export default RecipeBookView;