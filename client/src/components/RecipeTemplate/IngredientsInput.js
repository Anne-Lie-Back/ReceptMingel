import { useState } from 'react';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import media from '../../config/media';
import addOutline from '@iconify/icons-gridicons/add-outline';
import { Icon } from "@iconify/react";
import TextListItem from './text.listItem';

const Wrapper = styled('div', {
    margin: '2.5rem 0',
});

const Label = styled('label', {
    margin: '0 1rem 0 0',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700
});

const StyledAddIcon = styled(Icon, {
    marginLeft: '1rem',
    colors: THEME.colors.black[0],
    fontSize: '40px',

    ':hover' : {
        color: THEME.colors.contrast[0],
        cursor: 'pointer'
    },

    [media.above.mobile] : {
        height: '30px'
    },
    [media.above.tablet] : {
        fontSize: '25px',
    }
});

const List = styled('ul', {
    width: '100%',
    margin: '1rem 0 2rem 0'
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    margin: '1rem 0'
});

const InputField = styled('input', {
    width: '100%',
    padding: '0 0 0 2rem',
    border: 0,
    background: 'transparent',
    borderBottom: '1px solid black',
    fontWeight: 400, 
    fontSize: THEME.fontSizes.normal,
    fontFamily: THEME.fonts.text,
    letterSpacing: '0.05rem',
    outline: 0,

    '::placeholder': {
        fontWeight: 400, 
        fontSize: THEME.fontSizes.small,
    },
    [media.above.mobile] : {
        fontSize: THEME.fontSizes.large,
        '::placeholder': {
            fontWeight: 400, 
            fontSize: THEME.fontSizes.normal,
        },
    },
});

const Required = styled('span', {
    color: THEME.colors.contrast[0],
    fontSize: THEME.fontSizes.large
});

const IngredientsInput = ({inputValues, updateInputValues}) => {
    const [newIngredient, setNewIngredient] = useState(null);
    const [editInput, setEditedInput] = useState(null);
    const [activeEdit, setActiveEdit] = useState(null);

    //Adds items to official ingredients-array
    const handleAddingListItems = () => {
        const newItem = newIngredient;
        //checks if input is empty
        if(newItem !==""){
            const newList = [...inputValues.ingredients, newItem];
            updateInputValues({                    
                ...inputValues,    
                ingredients: newList         
            })
            //empties inputfield
            setNewIngredient('');
        }  
    };

    //Opens edit-mode for single listitem
    const handleOpenEdit = (index, ingredient) => {
        setActiveEdit(activeEdit === index ? null : index)
        setEditedInput(ingredient)
    };
    
    //updates official ingredient-array
    const handleEditItem = (index) => {
        //checks if input is empty
        if(editInput !==""){
            inputValues.ingredients.splice(index, 1, editInput)
            //empties inputfield
            setActiveEdit(null);
        }
        //TODO set old value if input empty
    };

    //Deletes item from official ingredients-array
    //TODO fix bug that removes two categories with same name
    const handleListDeletion = (ingredient) => {
        const newList = inputValues.ingredients.filter((item) => item !== ingredient);
        updateInputValues({                    
            ...inputValues,    
            ingredients: newList         
        })
        //empties inputfield
        setActiveEdit(null);
    };

    const handleEnter = (event) => {
        event.key === 'Enter' && handleAddingListItems();
    };

    const handleEnterEdit = (event, index) => {
        event.key === 'Enter' && handleEditItem(index);
    };

    return(
        <Wrapper>
            <Label>Ingredienser <Required> * </Required> </Label>
            <List>      
                {inputValues.ingredients.map((ingredient, index)=> (
                        <TextListItem 
                            isEditIngredient={activeEdit === index}
                            value = {editInput}
                            handleOpenEdit = {() => handleOpenEdit(index, ingredient)} 
                            handleEditItem = {() => handleEditItem(index)}
                            handleEnterKey = {(event) => handleEnterEdit(event, index)}
                            handleChange = {(event) => setEditedInput(event.target.value)}
                            handleRemove = { () => handleListDeletion(ingredient) }
                            >
                            {ingredient}
                        </TextListItem>
                ))}  
            </List> 
            
            <FlexRow>
                <InputField
                    type = "text" 
                    name = "ingredients" 
                    value = {newIngredient}
                    placeholder = "I format: Antal Enhet Råvara"
                    onChange = {(event) => setNewIngredient(event.target.value)}
                    onKeyDown={(event) => handleEnter(event)}
                />
                <StyledAddIcon icon = {addOutline} onClick = {handleAddingListItems}/> 
            </FlexRow>

        </Wrapper>
    )
};

export default IngredientsInput;