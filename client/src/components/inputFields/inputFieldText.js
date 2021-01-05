import { Fragment } from 'react';
import { styled } from 'styletron-react';

const StyledInputField = styled('input', {
    marginBottom: '1rem'
})

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