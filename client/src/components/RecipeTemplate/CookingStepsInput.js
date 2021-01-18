import { useState } from 'react';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import InputField from '../inputField';
import { Icon } from "@iconify/react";
import addOutline from '@iconify/icons-gridicons/add-outline';
import TextListItem from './text.listItem';

const Wrapper = styled('div', {
    margin: '2.5rem 0 1.5rem 0',
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    margin: '1rem 0'
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
});


const CookingStepsInput = ({inputValues, updateInputValues}) => {
    const [newStep, setNewStep] = useState('');
    const [editInput, setEditedInput] = useState('');
    const [activeEdit, setActiveEdit] = useState(null);

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

    const handleEnter = (event) => {
        event.key === 'Enter' && handleAddingListItems();
    };

    const handleEnterEdit = (event, index) => {
        event.key === 'Enter' && handleEditItem(index);
    };

    return(
        <Wrapper>
            <Label>Steg för steg-instruktioner:</Label>
            <List>      
                {inputValues.cookingSteps.map((step, index) => (
                        <TextListItem 
                            isEditStep={activeEdit === index}
                            value = {editInput}
                            handleOpenEdit = {() => handleOpenEdit(index, step)}
                            handleEditItem = {() => handleEditItem(index)}
                            handleEnterKey = {(event) => handleEnterEdit(event, index)}
                            handleChange = {(event) => setEditedInput(event.target.value)}
                            //Todo, change to index instead of step?
                            handleRemove = { () => handleListDeletion(step) }
                        >
                            {step}
                        </TextListItem>
                ))}  
            </List> 
            <FlexRow>
                <InputField 
                    $as = "textarea"  
                    name = "cookingSteps" 
                    placeholder = "Förklara ett steg här. Tryck sedan ENTER eller på plus-knappen."
                    rows = "2" 
                    //cols = "80"
                    value = {newStep}
                    styling = "box"
                    $style = {{
                        width: '570px',
                        fontFamily: THEME.fonts.text,
                        fontWeight: 400, 
                        fontSize: THEME.fontSizes.small,
                        '::-webkit-input-placeholder': {
                            fontFamily: THEME.fonts.text,
                            fontWeight: 400, 
                            fontSize: THEME.fontSizes.small
                    }}}
                    margin = '0 0 1rem 0'
                    handleChange = {(event) => setNewStep(event.target.value)}
                    onKeyDown={(event) => handleEnter(event)}
                />
                <StyledAddIcon icon = {addOutline} onClick = {handleAddingListItems}/>  
            </FlexRow>
        </Wrapper>
    )
};

export default CookingStepsInput;