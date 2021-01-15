import { styled } from 'styletron-react';
import THEME from '../../config/theme';

const Wrapper = styled('div', {
    width: '100%'
});

const RecipeBookView = () => (
    <Wrapper>
        <h1>Här finns en bok</h1>
    </Wrapper>
);

export default RecipeBookView;