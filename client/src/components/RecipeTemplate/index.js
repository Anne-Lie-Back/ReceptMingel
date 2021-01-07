import {useEffect, useHistory, useState} from 'react';
import { styled } from 'styletron-react';
import InputField from '../inputField'
import ListItemCategories from './categories.listItem'

import Icons from '../../config/icons'

const Wrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '800px'
})

const FormWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '600px'
})

const Button = styled('button', {
    padding: '1rem 2rem',
    margin: '1rem',
    backgroundColor: 'orange',
    color: 'white',
    textTransform: 'uppercase',

    ':hover': {
        cursor:'pointer',
        backgroundColor:'darkorange' 
    }
})

const RecipeTemplate = () => {
    
    const [inputValues, setInputValues] = useState({
        title: '',
        preambleHTML: '',
        image: null,
        portions: 4,
        cookingTime: '',
        difficulty: '',
        ingredients: [],
        cookingSteps: [],
        mdsaCategories: [],
        author: 'användarnamn',
        isShared: false
    });

    //stores file-data that goes up to image-bucket at server
    const [file, setFile] = useState(null);
    const [newCategory, setNewCategory] = useState('');

    const history = useHistory;

    //icons
    const AddIcon = Icons.Add;

    //handle input-changes
    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValues({
            ...inputValues,
            [name]: value,
          });
    }

    console.log('inputValues.mdsaCategories', inputValues.mdsaCategories);

    const handleAddingListItems = (list) => {
        console.log('category', newCategory);
        //TODO make this more effecive
        if (list === "mdsaCategories"){
            const newItem = newCategory;
            if(newItem.text !==""){
                const categories = [...inputValues.mdsaCategories, newItem];
                setInputValues({
                    mdsaCategories: categories
                })
            }  
        } /* else if (list === "ingredients"){
            console.log('Ingredienser!')
            setInputValues(previous => ({
                ingredients: [...previous, value]
            })) 
        }else if (list === "cookingSteps"){
            console.log('Tillagningssteg!')
            setInputValues(previous => ({
                cookingSteps: [...previous, value]
            })) 
        } */
    }

    const handleListEdits = () => {
        console.log('edit me!');
    }

    const handleListDeletion = () => {
        console.log('Delete me!')
    }

    //Listens after changes to file-state. If changed to not null, the image will be sent to the bucket and id 
    // set to inputValues.image to link correct image in bucket to user in database.
    useEffect(() => {
        if (!file) return;
        
        const formData = new FormData();
        formData.append("image", file);
    
        fetch('http://localhost:8080/api/images', {
            method: "POST",
            credentials: "include",
            body: formData, 
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.message === "success") {  
              setInputValues((prev) => ({ ...prev, image: data.id }));
            }
          })
      }, [file]);

    //sends inputvalues to db
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('inputValues', inputValues);
        fetch('http://localhost:8080/api/recipes/', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(inputValues)
        })
        .then((res) => {
            //if response is good the user will be redirected to their userpage
            //TODO, do I really need this?
            if(res.ok) history.push('/recipe');
            res.json()
        })
        .catch((error) => {
            console.log('error', error);
        })
    };

    return(
        <Wrapper>
            <FormWrapper>
                <InputField 
                    type = "text"  
                    name = "title" 
                    label = "Titel:"
                    handleChange = {handleChange}
                />

                <InputField 
                    $as = "textarea" 
                    name = "preambleHTML" 
                    label = "Beskrivning:"
                    rows="4" 
                    cols="80"  
                    handleChange = {handleChange}
                />

                <InputField 
                    type = "file" 
                    name = "image" 
                    label = "Bild:"
                    accept = "image/*"
                    handleChange = {(event) => setFile(event.target.files[0])}
                /> 

                <label for="cookingTime">Beräknad tillagningstid:</label>
                <select name="cookingTime" id="cookingTime">
                    <option value="0-15min">0-15min</option>
                    <option value="16-30min">16-30min</option>
                    <option value="31-45min">31-45min</option>
                    <option value="46-60min">46-60min</option>
                    <option value="1h - 1:30h">1h - 1:30h</option>
                    <option value="1:31h - 2:00h">1:31h - 2:00h</option>
                    <option value="mer än 2:00h">mer än 2:00h</option>
                </select>

                <label for="difficulty">Svårighetsgrad:</label>
                <select name="difficulty" id="difficulty">
                    <option value="lätt">LÄTT</option>
                    <option value="medel">MEDEL</option>
                    <option value="omständigt">OMSTÄNDIGT</option>
                    <option value="svårt">SVÅRT</option>
                </select>

                <InputField 
                    type = "text" 
                    name = "mdsaCategories" 
                    label = "mdsaCategories"
                    handleChange = {(event) => setNewCategory(event.target.value)}
                />
                <AddIcon size = "24px" color = "orange" handleClick = {() => handleAddingListItems("mdsaCategories")}/>
                
                {inputValues.mdsaCategories.map(category => (
                        <ListItemCategories handleEdit = {handleListEdits} handleRemove = {handleListDeletion}>
                            {category}
                        </ListItemCategories>
                ))}

                <InputField 
                    type = "number" 
                    name = "portions" 
                    label = "Antal portioner:"
                    min="1" 
                    max="16"
                    handleChange = {handleChange}
                />
                
                <InputField 
                    type = "text" 
                    name = "ingredients" 
                    label = "Ingredients"
                    handleChange = {handleChange}
                />
                <AddIcon size = "24px"/>


                <InputField 
                    type = "text"  
                    name = "cookingSteps" 
                    label = "steg 1:" 
                    handleChange = {handleChange}
                />
                <AddIcon size = "24px" color = 'pink'/>
  
                <Button onClick = {handleSubmit}>Register</Button>
            </FormWrapper>
        </Wrapper>
    )
};

export default RecipeTemplate;