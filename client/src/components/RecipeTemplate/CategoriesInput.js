import { useState } from 'react';
import { styled } from 'styletron-react';
import InputField from '../inputField'
import ListItemCategories from './categories.listItem'
import Icons from '../../config/icons'

const Wrapper = styled('div', {
    width: '100%',
    border: '1px solid #DEEFFF',
    margin: '0.5rem',
    padding: '0.5rem',
})

const CategoriesInput = ({inputValues, updateInputValues}) => {
    const [newCategory, setNewCategory] = useState('');
    const AddIcon = Icons.Add;

    const handleAddingListItems = () => {
        const newItem = newCategory;
         if(newItem.text !==""){
            const newList = [...inputValues.mdsaCategories, newItem];
            updateInputValues({                    
                ...inputValues,    
                mdsaCategories: newList         
            })
        };
    };

    //TODO fix bug that removes two categories with same name
    const handleListDeletion = (category) => {
        const newList = inputValues.mdsaCategories.filter((item) => item !== category);
        updateInputValues({                    
            ...inputValues,    
            mdsaCategories: newList         
        }) 
    }
    
    return(
        <Wrapper>
            <InputField 
                type = "text" 
                name = "mdsaCategories" 
                label = "Kategorier:"
                handleChange = {(event) => setNewCategory(event.target.value)}
            />
            <AddIcon size = "24px" color = "orange" handleClick = {handleAddingListItems}/> 
            
            {inputValues.mdsaCategories.map(category => (
                    <ListItemCategories handleRemove = { () => handleListDeletion(category) }>
                        {category}
                    </ListItemCategories>
            ))} 
        </Wrapper>
    );
};

export default CategoriesInput;