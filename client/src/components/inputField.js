import { Fragment } from 'react';
import { styled } from 'styletron-react';

//Styling in here
const StyledInputField = styled('input', {
    
})

//Error handling in here

const InputField = ( {type, name, label, handleChange, ...rest} ) => (
    <Fragment>
        <label for = {name}>{label}</label>
        <StyledInputField
            type = {type}
            name = {name} 
            id = {name}
            onChange = {handleChange}
            {...rest}
        />
    </Fragment>
);

export default InputField;