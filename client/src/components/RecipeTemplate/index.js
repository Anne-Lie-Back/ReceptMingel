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
import PartingStrip from './../PartingStrip';

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '2rem 0'
});

const FormWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '680px',
    padding: '1rem 2rem'
});

const TopFormWrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '380px 220px',
    gridTemplateRows: 'auto auto',
    columnGap: '1rem',
    width: '700px'
});

const Label = styled('label', {
    margin: '0 1rem 0 0',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700
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

const EffortWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '1rem 0'
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
});

const Button = styled('button', {
    width: '100%',
    padding: '0.5rem',
    margin: '1rem 0',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 0 2px black',
    backgroundColor: THEME.colors.contrast[0],
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700,
    textAlign: 'center',
    color: THEME.colors.white[0],
    letterSpacing: '0.05rem',

    ':hover': {
        cursor:'pointer',
        backgroundColor: THEME.colors.black[0]
    }
})

const RecipeTemplate = () => {
    
    const [inputValues, setInputValues] = useState({
        title: '',
        preambleHTML: '',
        image: null,
        portions: 0,
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
                        $style = {{ 
                            fontWeight: 700, 
                            fontSize: THEME.fontSizes.large, 
                            '::placeholder': {
                                fontWeight: 700, 
                                fontSize: THEME.fontSizes.normal
                            }}}
                        handleChange = {handleChange}
                    />
                    {/* TODO break out file upload to own file? */}
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
                        $style = {{
                            fontFamily: THEME.fonts.text,
                            fontWeight: 400, 
                            fontSize: THEME.fontSizes.small,

                            '::-webkit-input-placeholder': {
                                fontFamily: THEME.fonts.text,
                                fontWeight: 400, 
                                fontSize: THEME.fontSizes.small
                            }
                        }}
                        handleChange = {handleChange}
                    />
                </TopFormWrapper>

                <EffortWrapper>
                    <FlexRow>
                        <Label for = "difficulty"> Svårighetsgrad: </Label>
                        <DifficultyInput handleChange = {handleChange}/>
                    </FlexRow>
                    <FlexRow>
                        <Label for = "CookingTime"> Tidsåtgång: </Label>
                        <CookingTimeInput handleChange = {handleChange}/>
                    </FlexRow>
                </EffortWrapper>

                <CategoriesInput inputValues = {inputValues} updateInputValues = {setInputValues}/>
                
                <FlexRow $style = {{margin: '3rem 0 0 0'}}>
                    <Label>Antal portioner: </Label>
                    <InputField 
                        type = "number" 
                        name = "portions" 
                        value = {inputValues.portions}
                        min="1" 
                        max="16"
                        styling = "basic"
                        $style = {{width: '55px', padding: "0.2rem 0.5rem"}}
                        handleChange = {handleChange}
                    />
                </FlexRow>

                <IngredientsInput inputValues = {inputValues} updateInputValues = {setInputValues}/>
                <PartingStrip width = "200px"/>
                <CookingStepsInput inputValues = {inputValues} updateInputValues = {setInputValues}/>
                <PartingStrip width = "200px"/>
                <Button onClick = {handleSubmit}>Spara Recept</Button>
            </FormWrapper>
        </Wrapper>
    )
};

export default RecipeTemplate;