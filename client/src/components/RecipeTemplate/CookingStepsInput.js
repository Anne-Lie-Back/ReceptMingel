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

const CookingStepsInput = ({inputValues, updateInputValues}) => {
    const [newStep, setNewStep] = useState('');
    //const [isEditThis, setEditThis] = useState(false);

    const AddIcon = Icons.Add;

    const handleAddingListItems = () => {
        const newItem = newStep;
         if(newItem.text !==""){
            const newList = [...inputValues.cookingSteps, newItem];
            updateInputValues({                    
                ...inputValues,    
                cookingSteps: newList         
            })
        }   
    }

    const handleEditListItems = () => {
        console.log('EDIT ME!')
    }

    //TODO fix bug that removes two categories with same name
    const handleListDeletion = (ingredient) => {
        const newList = inputValues.cookingSteps.filter((item) => item !== ingredient);
        updateInputValues({                    
            ...inputValues,    
            cookingSteps: newList         
        }) 
    }

    return(
        <Wrapper>
            <List>      
                {inputValues.cookingSteps.map(step => (
                        <TextListItem handleEdit = {handleEditListItems} handleRemove = { () => handleListDeletion(step) }>
                            {step}
                        </TextListItem>
                ))}  
            </List> 
            <InputField 
                $as = "textarea"  
                name = "cookingSteps" 
                label = 'Steg för steg-instruktioner:'
                rows="2" 
                cols="80" 
                handleChange = {(event) => setNewStep(event.target.value)}
            />
            <AddIcon size = "24px" handleClick = {handleAddingListItems}/> 

        </Wrapper>
    )
};

export default CookingStepsInput;