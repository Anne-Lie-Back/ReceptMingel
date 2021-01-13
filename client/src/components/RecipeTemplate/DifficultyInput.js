import { styled } from 'styletron-react';

const Wrapper = styled('div', {
    margin: '0.5rem 0'
});

const DifficultyInput = ({handleChange}) => (
    <Wrapper>
        <select name="difficulty" id="difficulty" onChange = {handleChange}>
            <option value="lätt">LÄTT</option>
            <option value="medel">MEDEL</option>
            <option value="omständigt">OMSTÄNDIGT</option>
            <option value="svårt">SVÅRT</option>
        </select>
    </Wrapper>
);

export default DifficultyInput;