import { styled } from 'styletron-react';
import THEME from './../../config/theme';
import media from '../../config/media';
import { Icon } from "@iconify/react";
import bxCheckCircle from '@iconify/icons-bx/bx-check-circle';
import minusCircleOutline from '@iconify/icons-eva/minus-circle-outline';
import bxEditAlt from '@iconify/icons-bx/bx-edit-alt';

const Wrapper = styled('li', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0.4rem 0.5rem 1rem',
    borderBottom: '1px solid #E3E3E3'
});

const Dot = styled('div', {
    width: '5px',
    height: '5px',
    marginRight: '2rem',
    backgroundColor: '#000000',
    borderRadius: '50%'
});

const TextWrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fonts.small,
    color: THEME.colors.black[0],
    fontWeight: 400
});

const RestrictWidth = styled('div', {
    width: '100%'
})

const IconWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginLeft: '1rem',
});

const StyledIcon = styled(Icon, {
    marginLeft: '1rem',
    colors: THEME.colors.black[0],
    fontSize: '25px',

    ':hover' : {
        color: THEME.colors.contrast[0],
        cursor: 'pointer'
    }
});

const InputField = styled('input', {
    width: '100%',
    outline:'none',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    letterSpacing: '0.05rem',
    fontWeight: 400, 
    backgroundColor: 'orange',
    '::-webkit-input-placeholder': {
        fontFamily: THEME.fonts.text,
        fontWeight: 400, 
        fontSize: THEME.fontSizes.small
    }
});

const TextListItem = ({children, isEditIngredient, isEditStep, value, handleOpenEdit, handleEditItem, handleEnterKey, handleChange, handleRemove}) => {
    
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
                            rows="3" 
                            onChange = {handleChange}
                            onKeyDown = {handleEnterKey}
                        />
                    </TextWrapper>
                    <IconWrapper>
                        <StyledIcon icon = {bxCheckCircle} onClick = {handleEditItem}/> 
                        <StyledIcon icon = {minusCircleOutline} onClick = {handleRemove}/> 
                    </IconWrapper>
                </>
                :
                <>
                    <TextWrapper>
                        <Dot/>
                        <RestrictWidth>
                            {children}
                        </RestrictWidth>
                    </TextWrapper>
                    <IconWrapper>
                        <StyledIcon icon = {bxEditAlt} onClick = {handleOpenEdit}/> 
                        <StyledIcon icon = {minusCircleOutline} onClick = {handleRemove}/> 
                    </IconWrapper>
                </>
            }
        </Wrapper>
    )
}

export default TextListItem;