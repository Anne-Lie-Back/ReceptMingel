import { useState } from 'react';
import { styled } from 'styletron-react';
import InputField from '../inputField'
import ListItemCategories from './categories.listItem'
import Icons from '../../config/icons'

const Wrapper = styled('div', {
    width: '100%',
    border: '1px solid #DEEFFF',
    padding: '1rem',
})

const CategoriesInput = ({inputValues, addToInputValues}) => {
    const [newCategory, setNewCategory] = useState('');
    const AddIcon = Icons.Add;

    console.log('inputValues', inputValues)
    //console.log('addToInputValues', addToInputValues);

    const handleAddingListItems = () => {
        const newItem = newCategory;
         if(newItem.text !==""){
            const categories = [...inputValues.mdsaCategories, newItem];
            addToInputValues({
                mdsaCategories: categories
            })
        }   
    }

    
    const handleListEdits = () => {
        console.log('edit me!');
    }

    const handleListDeletion = () => {
        console.log('Delete me!')
    } 
    
    return(
        <Wrapper>
            <InputField 
                type = "text" 
                name = "mdsaCategories" 
                label = "mdsaCategories"
                handleChange = {(event) => setNewCategory(event.target.value)}
            />
            <AddIcon size = "24px" color = "orange" handleClick = {handleAddingListItems}/> 
            
            {inputValues.mdsaCategories.map(category => (
                    <ListItemCategories handleEdit = {handleListEdits} handleRemove = {handleListDeletion}>
                        {category}
                    </ListItemCategories>
            ))} 
        </Wrapper>
    );
};

export default CategoriesInput;