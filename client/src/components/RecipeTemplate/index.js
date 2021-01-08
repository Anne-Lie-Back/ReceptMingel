import {useEffect, useState} from 'react';
import { styled } from 'styletron-react';
import InputField from '../inputField';
import CategoriesInput from './CategoriesInput';
import CookingTimeInput from './CookingTimeInput';
import DifficultyInput from './DifficultyInput';
import IngredientsInput from './IngredientsInput';
import CookingStepsInput from './CookingStepsInput';

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '800px',
    margin: '2rem 1rem'
});

const FormWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '600px'
});

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
        cookingTime: '0-15min',
        difficulty: 'lätt',
        ingredients: [],
        cookingSteps: [],
        mdsaCategories: [],
        author: 'användarnamn',
        isShared: false
    });

    //stores file-data that goes up to image-bucket at server
    const [file, setFile] = useState(null);

    //handle input-changes
    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValues({
            ...inputValues,
            [name]: value,
          });
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
        fetch('http://localhost:8080/api/recipes/', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(inputValues)
        })
        .then((res) => {
            console.log('Recipe uploaded successfully!')
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
                <CookingTimeInput handleChange = {handleChange}/>
                <DifficultyInput handleChange = {handleChange}/>
                <CategoriesInput inputValues = {inputValues} updateInputValues = {setInputValues}/>
                <InputField 
                    type = "number" 
                    name = "portions" 
                    label = "Antal portioner:"
                    min="1" 
                    max="16"
                    handleChange = {handleChange}
                />
                <IngredientsInput inputValues = {inputValues} updateInputValues = {setInputValues}/>
                <CookingStepsInput inputValues = {inputValues} updateInputValues = {setInputValues}/>
                <Button onClick = {handleSubmit}>Register</Button>
            </FormWrapper>
        </Wrapper>
    )
};

export default RecipeTemplate;