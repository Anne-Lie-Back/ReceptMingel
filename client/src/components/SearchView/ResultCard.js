import { styled } from 'styletron-react';
//import THEME from '../../config/theme';

const Wrapper = styled('div', {
    width: '100%',
    maxWidth: '900px',
    height: '50px',
    margin: '1rem 0',
    backgroundColor: 'gray'
})

const ResultCard = () => (
    <Wrapper>
        We have und result
    </Wrapper>
);

export default ResultCard;