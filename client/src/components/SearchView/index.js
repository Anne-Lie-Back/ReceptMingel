import { styled } from 'styletron-react';
//import THEME from '../../config/theme';

const Wrapper = styled('div', {
    width: '100%'
});

const SearchView = () => (
    <Wrapper>
        <h1>Här söker vi</h1>
    </Wrapper>
);

export default SearchView;