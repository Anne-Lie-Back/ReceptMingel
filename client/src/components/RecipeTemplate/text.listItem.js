import {useState} from 'react';
import { styled } from 'styletron-react';
import Icons from '../../config/icons'
import InputField from '../inputField';

const Wrapper = styled('li', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderBottom: '1px solid #E3E3E3'
})

const Dot = styled('div', {
    width: '5px',
    height: '5px',
    marginRight: '2rem',
    backgroundColor: '#000000',
    borderRadius: '50%'
})

const TextWrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
})

const IconWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    width:'50px',
    marginLeft: '1rem',
})

const TextListItem = ({children, isEditIngredient, isEditStep, value, handleOpenEdit, handleEditItem, handleChange, handleRemove}) => {

    //Icons
    const EditIcon = Icons.EditSimple;
    const RemoveIcon = Icons.Minus;
    const DoneIcon = Icons.Done;

    // JSX checks if edit from ingredient or step is active for this element (checks in parent)
    // If it is it will render different inputField-types depending on if it is ingredient or step that wants to be edited
    // If both edit-bools are false, the element will display the child as ordinary text
    return(
        <Wrapper>
            {isEditIngredient || isEditStep?
                <>
                    <TextWrapper>
                        <Dot/>
                        <InputField 
                            $as = {isEditStep? 'textarea' : null}
                            type = {isEditIngredient? 'text' : null} 
                            name = "ingredients" 
                            value = {value}
                            rows="2" 
                            cols="80" 
                            handleChange = {handleChange}
                        />
                    </TextWrapper>
                    <IconWrapper>
                        <DoneIcon size = "20px" handleClick = {handleEditItem}/>
                        <RemoveIcon size = "20px" handleClick = {handleRemove}/>
                    </IconWrapper>
                </>
                :
                <>
                    <TextWrapper>
                        <Dot/>
                        {children}
                    </TextWrapper>
                    <IconWrapper>
                        <EditIcon size = "20px" handleClick = {handleOpenEdit}/>
                        <RemoveIcon size = "20px" handleClick = {handleRemove}/>
                    </IconWrapper>
                </>
            }
        </Wrapper>
    )
}

export default TextListItem;