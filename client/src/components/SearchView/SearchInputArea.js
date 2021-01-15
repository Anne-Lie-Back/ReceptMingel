import { styled } from 'styletron-react';
//import THEME from '../../config/theme';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '100px',
    backgroundColor: 'pink'
})

const SearchInputArea = () => {
    return(
        <Wrapper>
            Här söker vi
        </Wrapper>
    )  
};

export default SearchInputArea;