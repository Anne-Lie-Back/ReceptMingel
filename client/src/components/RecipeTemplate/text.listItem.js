import { styled } from 'styletron-react';
import Icons from '../../config/icons'

const Wrapper = styled('li', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.5rem 1rem',
    padding: '0.5rem 1rem',
})

const IconWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '1rem'
})

const TextListItem = ({children, handleEdit, handleRemove}) => {
    //const EditIcon = Icons.EditSimple
    const RemoveIcon = Icons.Minus

    return(
        <Wrapper>
            {children}
            <IconWrapper>
                {/* <EditIcon size = "1rem" handleClick = {handleEdit}/> */}
                <RemoveIcon size = "1rem" handleClick = {handleRemove}/>
            </IconWrapper>
        </Wrapper>
    )
}

export default TextListItem;