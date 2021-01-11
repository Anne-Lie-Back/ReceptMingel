import { styled } from 'styletron-react';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column'
});

//Styling in here
const StyledInputField = styled('input', {
    width: '100%'
});

//Error handling in here

const InputField = ( {type, name, label, handleChange, ...rest} ) => (
    <Wrapper>
        <label for = {name}>{label}</label>
        <StyledInputField
            type = {type}
            name = {name} 
            id = {name}
            onChange = {handleChange}
            {...rest}
        />
    </Wrapper>
);

export default InputField;