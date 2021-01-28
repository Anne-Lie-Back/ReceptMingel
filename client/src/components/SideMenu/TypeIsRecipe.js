import { useHistory, Link, useParams } from 'react-router-dom';
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
    margin: '0.75rem 0',

    ':hover' : {
        color: THEME.colors.contrast[0],
        cursor: 'pointer'
    }
});

const StyledLink = styled(Link, {
    textDecoration: 'none',
    color: THEME.colors.white[0],

    ':hover' : {
        color: THEME.colors.contrast[0],
        cursor: 'pointer'
    }

})

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

const TypeIsRecipe = ({recipeList, setIsAdd, setIsEdit, setIsOpen, searchResults, handleChange}) => {
    // eslint-disable-next-line no-unused-vars
    let history = useHistory()
    let slug = useParams()

    const handleAddClick = () => {
        setIsAdd(true)
        if(!slug) history.push(`/recipe/`)
        setIsEdit(false)
        setIsOpen()
    };

    const handleMenuClick = () => {
        setIsAdd(false)
        setIsEdit(false)
    };

    return(
        <>
            <Link to = {'/recipe/'} style = {{textDecoration: 'none'}}>
                <AddButtonText onClick = {handleAddClick}> Skapa nytt recept </AddButtonText>
            </Link>
            <FilterInput styling = "basic" handleChange = {(event) => handleChange(event)} placeholder = 'Sök i  dina recept'/>
            <List>
                {searchResults.length > 0?
                    <>
                        {searchResults.map((item, index) => (
                            <StyledLink to = {`/recipe/${item._id}`}>
                                <ListItem 
                                    key = {index} 
                                    onClick = {handleMenuClick}
                                > 
                                    {item.title} 
                                </ListItem>
                            </StyledLink>
                        ))}
                    </>
                :
                    <>
                        {recipeList.map((item, index) => (
                            <StyledLink key = {index}  to = {`/recipe/${item._id}`}>
                                <ListItem 
                                    onClick = {handleMenuClick}
                                > 
                                    {item.title} 
                                </ListItem>
                            </StyledLink>
                        ))}
                    </>
                }
            </List>
        </>
    );
};

export default TypeIsRecipe;