import {useState} from 'react';
import { styled } from 'styletron-react';
import Icons from '../../config/icons'
import InputField from '../inputField';

const Wrapper = styled('li', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.5rem 1rem',
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

const TextListItem = ({children, isEditThis, value, handleOpenEdit, handleEditItem, handleChange, handleRemove}) => {
    //const [currentInputValue, setcurrentInputValue] = useState();
    const EditIcon = Icons.EditSimple;
    const RemoveIcon = Icons.Minus;
    const DoneIcon = Icons.Done;

    return(
        <Wrapper>
            {isEditThis?
                <>
                    <InputField 
                        type = "text" 
                        name = "ingredients" 
                        value = {value}
                        handleChange = {handleChange}
                    />
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