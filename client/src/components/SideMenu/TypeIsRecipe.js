import { useState } from 'react';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import InputField from '../inputField';

const List = styled('ul', {
    flexGrow: 1,
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    color: THEME.colors.white[0],
    fontWeight: 400,
    LineHeight: '19px',
    letterSpacing: '0.05rem'
});

const AddButtonText = styled('div', {
    width: '100%',
    padding: '0.5rem',
    margin: '1rem 0',
    borderRadius: '5px',
    boxShadow: '0 0 2px black',
    backgroundColor: THEME.colors.contrast[0],
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700,
    textAlign: 'center',
    color: THEME.colors.white[0],

    ':hover': {
        cursor:'pointer',
        backgroundColor: THEME.colors.black[0]
    }
});

const FilterInput = styled(InputField, {
    backgroundColor: THEME.colors.grey[0]
});

const TypeIsRecipe = ({recipeList}) => {
    const[filterInput, setFilterInput] = useState('');

    const handleClick = () => {
        console.log('I am clicked!')
    };

    const handleChange = (event) => {
        setFilterInput(event.target.value)
    };

    return(
        <>
        {console.log('filterInput', filterInput)}
            <AddButtonText onClick = {handleClick}>Skapa nytt recept</AddButtonText>
            <FilterInput handleChange = {(event) => handleChange(event)} placeholder = 'Sortera efter namn...'/>
            <List>
                {recipeList.map((item, index) => (
                    <li key = {index}> {item} </li>
                ))}
            </List>
        </>
    );
};

export default TypeIsRecipe;