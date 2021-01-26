import { useState } from 'react';
import { styled } from 'styletron-react';
import InputField from '../inputField';
import THEME from '../../config/theme';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '3rem 4rem 3rem 4rem',
    backgroundColor: THEME.colors.primary[0],
    borderRadius: '5px',
    boxShadow: '0 0 2px black'  
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
});

const Label = styled('label', {
    marginBottom: '0.5rem',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    color: THEME.colors.white[0]
});

const SearchInputField = styled(InputField, {
    width: '300px',
});

const Button = styled('button', {
    width: '75px',
    padding: '0.55rem',
    backgroundColor: THEME.colors.contrast[0],
    border: 'none',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    boxShadow: '0 0 2px black',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700,
    textAlign: 'center',
    color: THEME.colors.white[0],
    letterSpacing: '0.05rem',

    ':hover': {
        cursor:'pointer',
        backgroundColor: THEME.colors.black[0]
    }
});

const SearchInputArea = ({setSearchInput, handleClick}) => {

    return(
        <Wrapper>
            <Label for = "search">Vad vill du äta idag?</Label>
            <FlexRow>
                <SearchInputField 
                    type = "text"
                    name = "search"
                    styling = "basic"
                    handleChange = {(event) => {setSearchInput(event.target.value)}}
                />
                <Button onClick = {handleClick}> Sök </Button> 
            </FlexRow>
        </Wrapper>
    )  
};

export default SearchInputArea;