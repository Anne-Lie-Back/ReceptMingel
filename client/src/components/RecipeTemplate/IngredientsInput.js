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
    const [activeEdits, setActiveEdits] = useState([]);
    //const [isEditThis, setEditThis] = useState(false);

    const AddIcon = Icons.Add;

    const handleAddingListItems = () => {
        const newItem = newIngredient;
         if(newItem.text !==""){
            const newList = [...inputValues.ingredients, newItem];
            updateInputValues({                    
                ...inputValues,    
                ingredients: newList         
            })
        }   
    }

    const handleOpenEdit = (targetValue) => {
        if (activeEdits.indexOf(targetValue) > -1) {
            setActiveEdits(activeEdits.filter(value => value !== targetValue));
        } else {
            setActiveEdits(activeEdits.concat(targetValue));
        }
    }
    

    const handleEditItem = (index) => {
        console.log('index', index);
        console.log('editInput', editInput)
        inputValues.ingredients.splice(index, 1, editInput)

        setActiveEdits(activeEdits.filter(value => value !== index));
    }

    //TODO fix bug that removes two categories with same name
    const handleListDeletion = (ingredient, targetValue) => {
        const newList = inputValues.ingredients.filter((item) => item !== ingredient);
        updateInputValues({                    
            ...inputValues,    
            ingredients: newList         
        })
        setActiveEdits(activeEdits.filter(value => value !== targetValue));
    }

    return(
        <Wrapper>
            <List>      
                {inputValues.ingredients.map((ingredient, index)=> (
                        <TextListItem 
                            isEditThis={activeEdits.indexOf(index) > -1}
                            value = {ingredient}
                            handleOpenEdit = {() => handleOpenEdit(index)} 
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