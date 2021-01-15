import { styled } from 'styletron-react';
//import THEME from '../../config/theme';
import SearchInputArea from './SearchInputArea';
import ResultCard from './ResultCard';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
});

const SearchView = () => (
    <Wrapper>
        <SearchInputArea/>
        <ResultCard/>
    </Wrapper>
);

export default SearchView;