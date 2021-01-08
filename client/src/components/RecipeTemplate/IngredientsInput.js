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

    const AddIcon = Icons.Add;

    const handleAddingListItems = () => {
        const newItem = newIngredient;
         if(newItem.text !==""){
            const newList = [...inputValues.ingredients, newItem];
            updateInputValues({                    
                ...inputValues,    
                ingredients: newList         
            })
            setNewIngredient('');
        }  
    }

    const handleOpenEdit = (index, ingredient) => {
        setActiveEdit(activeEdit === index ? null : index)
        setEditedInput(ingredient)
    }
    

    const handleEditItem = (index) => {
        inputValues.ingredients.splice(index, 1, editInput)
        setActiveEdit(null);
    }

    //TODO fix bug that removes two categories with same name
    const handleListDeletion = (ingredient, targetValue) => {
        const newList = inputValues.ingredients.filter((item) => item !== ingredient);
        updateInputValues({                    
            ...inputValues,    
            ingredients: newList         
        })
        setActiveEdit(null);
    }

    return(
        <Wrapper>
            <List>      
                {inputValues.ingredients.map((ingredient, index)=> (
                        <TextListItem 
                            isEditThis={activeEdit === index}
                            value = {editInput}
                            handleOpenEdit = {() => handleOpenEdit(index, ingredient)} 
                            handleEditItem = {() => handleEditItem(index)}
                            handleChange = {(event) => setEditedInput(event.target.value)}
                            //TODO change to index?
                            handleRemove = { () => handleListDeletion(ingredient, index) }>
                            {ingredient}
                        </TextListItem>
                ))}  
            </List> 
            <InputField 
                type = "text" 
                name = "ingredients" 
                label = 'Ingredienser (mängd och råvara i format: "1 tsk vaniljpulver"):'
                handleChange = {(event) => setNewIngredient(event.target.value)}
            />
            <AddIcon size = "24px" handleClick = {handleAddingListItems}/> 

        </Wrapper>
    )
};

export default IngredientsInput;