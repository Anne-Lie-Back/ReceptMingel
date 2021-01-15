import { useState } from 'react';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import RecipeWheel from '../RecipeWheel';
import RecipeView from '../RecipeView';
import InputField from '../inputField';

const Wrapper = styled('div', {
    width: '100%',
});

const FilterInput = styled(InputField, {
    width: '250px',
    padding: '0.5rem 1rem',
    margin: '1rem',
    backgroundColor: THEME.colors.grey[0],
    border: 'none',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
});

const RecipeBookView = () => {
    const[filterInput, setFilterInput] = useState('');

    //Filterinput passed on to RecipeWheel as prop
    const handleChange = (event) => {
        setFilterInput(event.target.value)
    };

    return(
        <Wrapper>
            <FilterInput styling = "basic" handleChange = {(event) => handleChange(event)} placeholder = 'Sök i din receptbok här...'/>
            <RecipeWheel bannerTitle = "Filter-resultat"/>
            <RecipeView $style = {{margin: '1rem 0 3rem 0'}}/>
        </Wrapper>
    )
};

export default RecipeBookView;