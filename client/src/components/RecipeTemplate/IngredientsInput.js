import { useState } from 'react';
import { styled } from 'styletron-react';
import InputField from '../inputField';
import Icons from '../../config/icons';
import TextListItem from './text.listItem';

const Wrapper = styled('div', {
     margin: '0.5rem 0',
});

const List = styled('ul', {
    width: '100%'
})

const IngredientsInput = ({inputValues, updateInputValues}) => {
    const [newIngredient, setNewIngredient] = useState('');
    const [editInput, setEditedInput] = useState('');
    const [activeEdit, setActiveEdit] = useState(null);

    //Icons
    const { AddIcon } = Icons;

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

    return(
        <Wrapper>
            <List>      
                {inputValues.ingredients.map((ingredient, index)=> (
                        <TextListItem 
                            isEditIngredient={activeEdit === index}
                            value = {editInput}
                            handleOpenEdit = {() => handleOpenEdit(index, ingredient)} 
                            handleEditItem = {() => handleEditItem(index)}
                            handleChange = {(event) => setEditedInput(event.target.value)}
                            //TODO change to index?
                            handleRemove = { () => handleListDeletion(ingredient) }>
                            {ingredient}
                        </TextListItem>
                ))}  
            </List> 
            <InputField 
                type = "text" 
                name = "ingredients" 
                label = 'Ingredienser (mängd och råvara i format: "1 tsk vaniljpulver"):'
                value = {newIngredient}
                handleChange = {(event) => setNewIngredient(event.target.value)}
            />
            <AddIcon size = "24px" handleClick = {handleAddingListItems}/> 

        </Wrapper>
    )
};

export default IngredientsInput;