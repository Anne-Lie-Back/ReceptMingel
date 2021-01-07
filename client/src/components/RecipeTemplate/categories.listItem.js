import { styled } from 'styletron-react';
import Icons from '../../config/icons'

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '180px',
    margin: '0.5rem 1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#DEEFFF',
    border: '1px solid black',
    borderRadius: '5px',
    textTransform: 'uppercase'
})

const IconWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '1rem'
})

const ListItemCategories = ({children, handleRemove}) => {
    //icons
    const RemoveIcon = Icons.Minus

    return(
        <Wrapper>
            {children}
            <IconWrapper>
                <RemoveIcon size = "1rem" handleClick = {handleRemove}/>
            </IconWrapper>
        </Wrapper>
    );
};

export default ListItemCategories