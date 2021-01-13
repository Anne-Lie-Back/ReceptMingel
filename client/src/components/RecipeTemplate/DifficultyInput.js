import { styled } from 'styletron-react';
import THEME from '../../config/theme';

const Wrapper = styled('div', {
    margin: '0.5rem 0'
});


const DifficultyInput = ({handleChange}) => (
    <Wrapper>
        <select 
            name="difficulty" 
            id="difficulty"
            style = {{
                padding: "0.2rem 0.5rem",
                fontFamily: THEME.fonts.text,
                color: THEME.colors.black[0]
            }} 
            onChange = {handleChange}>
            <option value="lätt">LÄTT</option>
            <option value="medel">MEDEL</option>
            <option value="omständigt">OMSTÄNDIGT</option>
            <option value="svårt">SVÅRT</option>
        </select>
    </Wrapper>
);

export default DifficultyInput;