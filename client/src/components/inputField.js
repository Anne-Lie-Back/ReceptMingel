import { styled } from 'styletron-react';
import THEME from '../config/theme';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column'
});

//Styling in here
const StyledInputField = styled('input', {
    width: '100%',
    paddingLeft: '2rem',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    letterSpacing: '0.05rem',
});

const UnderlineInputField = styled(StyledInputField, {
    border: 0,
    outline: 0,
    background: 'transparent',
    borderBottom: '1px solid black',
});

const BoxInputField = styled(StyledInputField, {
    margin: '1rem 0',
    padding: '1rem',
    border: 1,
    outline: 0,
    background: 'transparent',
});

//Error handling in here

const InputField = ( {type, name, label, styling, handleChange, ...rest} ) => (
    <Wrapper>
        {styling === 'underline' &&
            <>
                {label && <label for = {name}>{label}</label>}
                <UnderlineInputField
                    type = {type}
                    name = {name} 
                    id = {name}
                    onChange = {handleChange}
                    {...rest}
                />
            </>
        }
        {styling === "box" && 
            <>
                {label && <label for = {name}>{label}</label>}
                <BoxInputField
                    type = {type}
                    name = {name} 
                    id = {name}
                    onChange = {handleChange}
                    {...rest}
                />
            </>
        }
        {styling === "basic" && 
            <>
                {label && <label for = {name}>{label}</label>}
                <StyledInputField
                    type = {type}
                    name = {name} 
                    id = {name}
                    onChange = {handleChange}
                    {...rest}
                />
            </>
        }
    </Wrapper>
);

export default InputField;