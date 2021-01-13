import { useState } from 'react';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import addOutline from '@iconify/icons-gridicons/add-outline';
import { Icon } from "@iconify/react";
import InputField from '../inputField'
import ListItemCategories from './categories.listItem'
//import Icons from '../../config/icons'

const Wrapper = styled('div', {
    width: '100%',
    border: `1px solid ${THEME.colors.primary[1]}`,
    margin: '0.5rem 0',
    padding: '1rem 0.5rem',
});

const Label = styled('label', {
    margin: '0 2.55rem 0 0',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    fontWeight: 500
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

const InputWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
});

const InputValueArea = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
});

const CategoriesInput = ({inputValues, updateInputValues}) => {
    const [newCategory, setNewCategory] = useState('');

    const handleAddingListItems = () => {
        const newItem = newCategory;
        
        if(newItem.text !==""){
            const newList = [...inputValues.mdsaCategories, newItem];
            updateInputValues({                    
                ...inputValues,    
                mdsaCategories: newList         
            })
            setNewCategory('');
        };
        console.log('inputValues', inputValues)
    };

    //TODO fix bug that removes two categories with same name
    const handleListDeletion = (category) => {
        console.log('category', category)
        const newList = inputValues.mdsaCategories.filter((item) => item !== category);
        updateInputValues({                    
            ...inputValues,    
            mdsaCategories: newList         
        }) 
    }
    
    return(
        <Wrapper>
            <InputWrapper>
                <Label>Kategorier:</Label>
                <InputField 
                    type = "text" 
                    name = "mdsaCategories" 
                    styling = "basic"
                    handleChange = {(event) => setNewCategory(event.target.value)}
                />
                <StyledAddIcon icon = {addOutline} onClick = {handleAddingListItems}/>
            </InputWrapper>
            <InputValueArea>
                {inputValues.mdsaCategories.map(category => (
                        <ListItemCategories handleRemove = { () => handleListDeletion(category) }>
                            {category}
                        </ListItemCategories>
                ))}
            </InputValueArea>
        </Wrapper>
    );
};

export default CategoriesInput;