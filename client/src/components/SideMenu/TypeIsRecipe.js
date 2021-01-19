import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import InputField from '../inputField';

const List = styled('ul', {
    margin: '1rem',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    color: THEME.colors.white[0],
    fontWeight: 400,
    textTransform: 'capitalize',
    letterSpacing: '0.05rem'
});

const ListItem = styled('li', {
    margin: '0.5rem 0',

    ':hover' : {
        color: THEME.colors.contrast[0],
        cursor: 'pointer'
    }
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
    letterSpacing: '0.05rem',

    ':hover': {
        cursor:'pointer',
        backgroundColor: THEME.colors.black[0]
    }
});

const FilterInput = styled(InputField, {
    padding: '0.5rem 1rem',
    marginTop: '1rem',
    backgroundColor: THEME.colors.grey[0],
    border: 'none',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
});

const TypeIsRecipe = ({recipeList}) => {
    // eslint-disable-next-line no-unused-vars
    const[filterInput, setFilterInput] = useState('');

    const handleClick = () => {
        console.log('I am clicked!')
    };

    const handleChange = (event) => {
        setFilterInput(event.target.value)
    };

    return(
        <>
            <AddButtonText onClick = {handleClick}>Skapa nytt recept</AddButtonText>
            <FilterInput styling = "basic" handleChange = {(event) => handleChange(event)} placeholder = 'Sök bland dina recept...'/>
            <List>
                {recipeList.map((item, index) => (
                    <ListItem key = {index}> <Link to = {`/recipe/${item._id}`}>{item.title}</Link></ListItem>
                ))}
            </List>
        </>
    );
};

export default TypeIsRecipe;