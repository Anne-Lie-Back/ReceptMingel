import { styled } from 'styletron-react';
import THEME from '../config/theme';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column'
});

//Styling in here
const StyledInputField = styled('input', {
    width: '100%',
    
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    letterSpacing: '0.05rem',
});

const BasicInputField = styled(StyledInputField, {
    padding: '0.5rem 1rem'
})

const UnderlineInputField = styled(StyledInputField, {
    paddingLeft: '2rem',
    border: 0,
    outline: 0,
    background: 'transparent',
    borderBottom: '1px solid black',
});

const BoxInputField = styled(StyledInputField, {
    margin: '1rem 0',
    padding: '0.75rem 1rem',
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
                <BasicInputField
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