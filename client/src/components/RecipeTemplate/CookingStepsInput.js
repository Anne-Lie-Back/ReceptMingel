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
    const [editInput, setEditedInput] = useState('');
    const [activeEdit, setActiveEdit] = useState(null);

    //Icons
    const { AddIcon } = Icons;

    //Adds items to official cookingSteps-array
    const handleAddingListItems = () => {
        const newItem = newStep;
        //checks if input is empty
        if(newItem !==""){
            const newList = [...inputValues.cookingSteps, newItem];
            updateInputValues({                    
                ...inputValues,    
                cookingSteps: newList         
            })
            //emptys inputfield
            setNewStep('');
        }
        //TODO set Error
    }

    //Opens edit-mode for single listitem
    const handleOpenEdit = (index, step) => {
        setActiveEdit(activeEdit === index ? null : index)
        setEditedInput(step)
    }

    //updates official cookingStep-array
    const handleEditItem = (index) => {
        //checks if input is empty
        if(editInput !==""){
            inputValues.cookingSteps.splice(index, 1, editInput)
            //emptys inputfield
            setActiveEdit(null);
        }
        //TODO set old value if string is empty
    }

    //Deletes item from official cookingStep-array
    //TODO fix bug that removes two categories with same name
    const handleListDeletion = (step) => {
        const newList = inputValues.cookingSteps.filter((item) => item !== step);
        updateInputValues({                    
            ...inputValues,    
            cookingSteps: newList         
        })
        //emptys inputfield
        setActiveEdit(null);
    }

    return(
        <Wrapper>
            <List>      
                {inputValues.cookingSteps.map((step, index) => (
                        <TextListItem 
                            isEditStep={activeEdit === index}
                            value = {editInput}
                            handleOpenEdit = {() => handleOpenEdit(index, step)}
                            handleEditItem = {() => handleEditItem(index)}
                            handleChange = {(event) => setEditedInput(event.target.value)}
                            //Todo, change to index instead of step?
                            handleRemove = { () => handleListDeletion(step) }
                        >
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
                value = {newStep}
                handleChange = {(event) => setNewStep(event.target.value)}
            />
            <AddIcon size = "24px" handleClick = {handleAddingListItems}/> 

        </Wrapper>
    )
};

export default CookingStepsInput;