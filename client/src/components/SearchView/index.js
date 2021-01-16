import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import SearchInputArea from './SearchInputArea';
import ResultCard from './ResultCard';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '3rem 1rem'
});

const ResultArea = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    maxHeight: '1000px',
    overflow: 'auto',

    '::-webkit-scrollbar' : { 
        //'-webkit-appearance': 'none',
        height: '0.6rem',
        backgroundColor: THEME.colors.grey[0]
    },

    '::-webkit-scrollbar-thumb' : {
        borderRadius: '2px',
        border: `1px solid grey`,
        backgroundColor: THEME.colors.secondary[0]
    }
});

const SearchView = () => (
    <Wrapper>
        <SearchInputArea/>
        <ResultArea>
            <ResultCard/>
        </ResultArea>
    </Wrapper>
);

export default SearchView;