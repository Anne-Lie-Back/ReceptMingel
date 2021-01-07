import { styled } from 'styletron-react';
import Icons from '../../config/icons'

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 2rem',
    padding: '1rem 2rem',
    color: 'DEEFFF',
    border: '1px solid black',
    borderRadius: '5px'
})

const IconWrapper = () => {
    
}

const ListItemCategories = ({children, handleEdit, handleRemove}) => {
    //icons
    const EditIcon = Icons.EditSimple
    const RemoveIcon = Icons.Minus

    return(
        <Wrapper>
            {children}
{/*             <IconWrapper>
                <EditIcon size = "2rem" handleClick = {handleEdit}/>
                <RemoveIcon size = "2rem" handleClick = {handleRemove}/>
            </IconWrapper> */}
        </Wrapper>
    );
};

export default ListItemCategories