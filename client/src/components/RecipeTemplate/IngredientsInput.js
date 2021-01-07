import { useState } from 'react';
import { styled } from 'styletron-react';
import InputField from '../inputField';
import Icons from '../../config/icons'
import TextListItem from './text.listItem'

const Wrapper = styled('div', {
     margin: '0.5rem 0',
});

const List = styled('ul', {
    width: '100%'
})

const IngredientsInput = ({inputValues, updateInputValues}) => {
    console.log('inputValues Ingredients', inputValues)
    const [newIngredient, setNewIngredient] = useState('');
    //const [list, setList] = useState(inputValues.ingredients)
    //const [isEditThis, setEditThis] = useState(false);

    const AddIcon = Icons.Add;

    const handleAddingListItems = () => {
        console.log('INGREDIENS!')
        const newItem = newIngredient;
         if(newItem.text !==""){
            const newList = [...inputValues.ingredients, newItem];
            updateInputValues({                    
                ...inputValues,    
                ingredients: newList         
            })
        }   
    }

    const handleEditListItems = () => {
        console.log('EDIT ME!')
    }

    //TODO fix bug that removes two categories with same name
    const handleListDeletion = (ingredient) => {
        const newList = inputValues.ingredients.filter((item) => item !== ingredient);
        updateInputValues({                    
            ...inputValues,    
            ingredients: newList         
        }) 
    }

    console.log('newIngredient', newIngredient)

    return(
        <Wrapper>
            <List>      
                {inputValues.ingredients.map(ingredient => (
                        <TextListItem handleEdit = {handleEditListItems} handleRemove = { () => handleListDeletion(ingredient) }>
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