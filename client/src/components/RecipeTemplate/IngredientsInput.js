import { useState } from 'react';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import InputField from '../inputField';
import addOutline from '@iconify/icons-gridicons/add-outline';
import { Icon } from "@iconify/react";
import TextListItem from './text.listItem';

const Wrapper = styled('div', {
     margin: '2rem 0',
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
    fontSize: '25px',

    ':hover' : {
        color: THEME.colors.contrast[0],
        cursor: 'pointer'
    }
});

const List = styled('ul', {
    width: '100%',
    margin: '1rem 0 2rem 0'
})

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    margin: '1rem 0'
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
    }

    //Opens edit-mode for single listitem
    const handleOpenEdit = (index, ingredient) => {
        setActiveEdit(activeEdit === index ? null : index)
        setEditedInput(ingredient)
    }
    
    //updates official ingredient-array
    const handleEditItem = (index) => {
        //checks if input is empty
        if(editInput !==""){
            inputValues.ingredients.splice(index, 1, editInput)
            //empties inputfield
            setActiveEdit(null);
        }
        //TODO set old value if input empty
    }

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
    }

    const handleEnter = (event) => {
        event.key === 'Enter' && handleAddingListItems();
    };

    const handleEnterEdit = (event, index) => {
        event.key === 'Enter' && handleEditItem(index);
    };

    return(
        <Wrapper>
            <Label>Ingredienser:</Label>
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
                    styling = "underline"
                    placeholder = "I format: Antal Enhet Råvara"
                    $style = {{
                        width: '570px',
                        fontWeight: 400, 
                            fontSize: '18px', 
                            '::placeholder': {
                                fontWeight: 400, 
                                fontSize: THEME.fontSizes.normal
                    }}}
                    handleChange = {(event) => setNewIngredient(event.target.value)}
                    onKeyDown={(event) => handleEnter(event)}
                />
                <StyledAddIcon icon = {addOutline} onClick = {handleAddingListItems}/> 
            </FlexRow>

        </Wrapper>
    )
};

export default IngredientsInput;