import { styled } from 'styletron-react';
import THEME from '../../config/theme'

const Wrapper = styled('div', {
    margin: '0.5rem 0'
});

const CookingTimeInput = ({inputValues, setInputValues}) => {

    const handleChange =(event) => {
        let value = event.target.value
        setInputValues({
            ...inputValues,
            cookingTime: value,
        });
    };

    return(
    <Wrapper>
        <select 
            name="cookingTime" 
            id="cookingTime" 
            onChange = {handleChange}
            style = {{
                padding: "0.2rem 0.5rem",
                backgroundColor: THEME.colors.secondary[0],
                fontFamily: THEME.fonts.text,
                color: THEME.colors.black[0]
            }} 
        >
            <option value="0 - 15min">0 - 15min</option>
            <option value="16 - 30min">16 - 30min</option>
            <option value="31 - 45min">31 - 45min</option>
            <option value="46 - 60min">46 - 60min</option>
            <option value="1h - 1:30h">1h - 1:30h</option>
            <option value="1:31h - 2:00h">1:31h - 2:00h</option>
            <option value="+2:00h">+2:00h</option>
        </select>
    </Wrapper>
)};

export default CookingTimeInput;