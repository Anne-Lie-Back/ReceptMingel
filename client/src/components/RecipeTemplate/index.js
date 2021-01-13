import {useEffect, useState} from 'react';
import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import Icons from '../../config/icons';
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
    padding: '2rem 0'
});

const FormWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
    maxWidth: '800px',
    padding: '1rem 2rem'
});

const TopFormWrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '400px 200px',
    gridTemplateRows: 'auto auto',
    columnGap: '1rem',
    width: '100%'
});

const Label = styled('label', {
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    fontWeight: 500
});

const FileUploadWrapper = styled('div', {
    gridColumn: '2/3',
    gridRow: '1/3',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    fontWeight: 400
});

const FileUpload = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '90%',
    backgroundColor: THEME.colors.grey[0],

    ':hover' : {
        backgroundColor: THEME.colors.black[0],
        cursor: 'pointer'
    }
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

    const { ImageIcon } = Icons;

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
                <TopFormWrapper>
                    <InputField 
                        type = "text"  
                        name = "title"
                        placeholder = "Titel"
                        styling = "underline"
                        $style = {{ fontWeight: 700 }}
                        handleChange = {handleChange}
                    />
                    <FileUploadWrapper>
                        <label htmlFor="upload-image" style = {{height: '100%'}}>
                            <FileUpload>
                                <ImageIcon color = {THEME.colors.white[0]} size = "70px"/>
                            </FileUpload>
                        <p>{file && file.name }</p>
                        </label>
                        <InputField 
                            type = "file" 
                            name = "image" 
                            accept = "image/*"
                            id = "upload-image"
                            styling = "basic"
                            $style = {{display: 'none'}}
                            handleChange = {(event) => setFile(event.target.files[0])}
                        />
                    </FileUploadWrapper>
                    <InputField 
                        $as = "textarea" 
                        name = "preambleHTML" 
                        placeholder = "Beskrivning"
                        rows="6" 
                        cols="80"  
                        styling = "box"
                        handleChange = {handleChange}
                    />
                </TopFormWrapper>
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