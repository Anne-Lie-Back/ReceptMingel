import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import Icons from '../../config/icons';

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '150px',
    margin: '0.5rem 1rem 0.5rem 0',
    padding: '0.25rem 1rem',
    backgroundColor: '#DEEFFF',
    border: '1px solid black',
    borderRadius: '5px',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    fontWeight: 500,
    textTransform: 'uppercase',

    ':hover' : {
        backgroundColor: THEME.colors.contrast[0],
        cursor: 'pointer'
    }
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
        <Wrapper onClick = {handleRemove}>
            {children}
            <IconWrapper>
                <RemoveIcon size = "1.2rem" />
            </IconWrapper>
        </Wrapper>
    );
};

export default ListItemCategories