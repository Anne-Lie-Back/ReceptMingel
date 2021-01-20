import { styled } from 'styletron-react';
import THEME from '../../config/theme';

const Wrapper = styled('div', {
    margin: '0.5rem 0'
});

const DifficultyInput = ({handleChange, difficulty}) => (
    <Wrapper>
        <select 
            name="difficulty" 
            id="difficulty"
            style = {{
                padding: "0.2rem 0.5rem",
                backgroundColor: THEME.colors.secondary[0],
                fontFamily: THEME.fonts.text,
                color: THEME.colors.black[0]
            }} 
            onChange = {handleChange}>
            <option selected={difficulty === "lätt"} value="lätt">LÄTT</option>
            <option selected={difficulty === "medel"} value="medel">MEDEL</option>
            <option selected={difficulty === "omständigt"} value="omständigt">OMSTÄNDIGT</option>
            <option selected={difficulty === "svårt"} value="svårt">SVÅRT</option>
        </select>
    </Wrapper>
);

export default DifficultyInput;