import { styled } from 'styletron-react';
import THEME from '../config/theme';

const Wrapper = styled('div', ({$margin}) => ({
    display: 'flex',
    margin: $margin && $margin,
    flexDirection: 'column'
}));

const StyledInputField = styled('input', {
    width: '100%',
    outline:'none',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    letterSpacing: '0.05rem',
});

const BasicInputField = styled(StyledInputField, ({$error}) => ({
    padding: '0.5rem 1rem',
    border: $error? `2px solid ${THEME.colors.error}` : 1,
}))

const UnderlineInputField = styled(StyledInputField, ({$error}) => ({
    paddingLeft: '2rem',
    border: 0,
    outline: 0,
    background: 'transparent',
    borderBottom: $error? `2px solid ${THEME.colors.error}` :'1px solid black',
}));

const BoxInputField = styled(StyledInputField, ({$error}) => ({
    padding: '0.75rem 1rem',
    border: $error? `2px solid ${THEME.colors.error}` : 1,
    outline: 0,
    background: 'transparent',
}));

const Required = styled('span', {
    color: THEME.colors.contrast[0],
    fontSize: THEME.fontSizes.large,
    fontWeight: 700
})

//Error handling in here

const InputField = ( {type, name, label, styling, margin, isRequired, handleChange, error, ...rest} ) => (
    <Wrapper $margin = {margin}>
        {styling === 'underline' &&
            <>
                {label &&
                    <label for = {name}> 
                        {label} 
                        {isRequired&& 
                            <Required> * </Required>
                        }
                    </label>
                }
                <UnderlineInputField
                    type = {type}
                    name = {name} 
                    id = {name}
                    $error = {error}
                    onChange = {handleChange}
                    {...rest}
                />
            </>
        }
        {styling === "box" && 
            <>
                {label &&
                    <label for = {name}> 
                        {label} 
                        {isRequired&& 
                            <Required> * </Required>
                        }
                    </label>
                }
                <BoxInputField
                    type = {type}
                    name = {name} 
                    id = {name}
                    $error = {error}
                    onChange = {handleChange}
                    {...rest}
                />
            </>
        }
        {styling === "basic" && 
            <>
                {label &&
                    <label for = {name}> 
                        {label} 
                        {isRequired&& 
                            <Required> * </Required> 
                        }
                    </label>
                }
                <BasicInputField
                    type = {type}
                    name = {name} 
                    id = {name}
                    $error = {error}
                    onChange = {handleChange}
                    {...rest}
                />
            </>
        }
    </Wrapper>
);

export default InputField;