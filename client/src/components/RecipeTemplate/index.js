import {useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../axios'
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
import AuthenticationContext from '../../contexts/authentication/context';

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '3rem 0',
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

const FileUpload = styled('div', ({$preview}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '90%',
    backgroundImage: $preview && `url(${$preview})`,
    backgroundColor: THEME.colors.grey[0],
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',

    ':hover' : {
        backgroundColor: THEME.colors.black[0],
        cursor: 'pointer'
    }
}));

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
    margin: '2.5rem 0 1rem 0',
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

const RecipeTemplate = ({setIsEdit, isEdit, setIsAdd, isAdd, recipe, slug, getRecipeById, getRecipesByAuthor, inputValues, setInputValues }) => {
    const {user} = useContext(AuthenticationContext);

    //stores file-data that goes up to image-bucket at server
    const [file, setFile] = useState(null);

    let history = useHistory()
    const { ImageIcon } = Icons;

    //handle input-changes
    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    }

    useEffect(() => {
        if(isEdit && recipe && !isAdd){
            setInputValues({
                title: recipe.title,
                preambleHTML: recipe.preambleHTML,
                portions: recipe.portions,
                cookingTime: recipe.cookingTime,
                difficulty: recipe.difficulty,
                ingredients: recipe.ingredients,
                cookingSteps: recipe.cookingSteps,
                mdsaCategories: recipe.mdsaCategories,
                authorId: user._id,
                author: user.username,
                isShared: recipe.isShared
            });
        }else{
            setInputValues({
                title: '',
                preambleHTML: '',
                image: null,
                portions: 0,
                cookingTime: '0-15min',
                difficulty: 'lätt',
                ingredients: [],
                cookingSteps: [],
                mdsaCategories: [],
                authorId: user._id,
                author: user.username,
                isShared: isEdit? recipe.isShared : false
            })
        } 
    },[isEdit])

    

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    console.log('recipe', recipe.title)
    console.log('recipe', recipe._id)

    //sends inputvalues to db.
    const handleSubmit = async() => {
        if(isAdd && !isEdit){
            console.log('ADD')
            await axios
            .post('/recipes', inputValues, { withCredentials: true })
            .then((res) => {
                //if response is good the user will be redirected to their new recipepage
                if(res.status === 200) history.push(`/recipe/${res.data._id}`);
            })
            .catch(error => console.log(error))    
        }

        if(!isAdd && isEdit){
            console.log('EDIT')
            await axios
            .patch(`/recipes/${recipe._id}`, inputValues, { withCredentials: true })
            .then((res) => {
                console.log('resPatch', res);
                if(res.status === 200){
                    console.log('slug', slug)
                    console.log('recipe._id', recipe._id)
                    getRecipeById(slug)
                    history.push(`/recipe/${recipe._id}`)   
                }     
            })
            .catch(error => console.log(error))
        }
        
        //Updates sidemenu with new recipe
        getRecipesByAuthor(user._id)
        
        //will close edit-view
        setIsEdit(false)
        setIsAdd(false)
    };

    return(
        <Wrapper>
            <FormWrapper>
                <TopFormWrapper>
                    <InputField 
                        type = "text"  
                        name = "title"
                        value = {inputValues.title}
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
                            <FileUpload
                                $preview = {
                                    (file && URL.createObjectURL(file)) ||
                                    ((recipe && isEdit) && recipe.imageURL) ||
                                    null
                                }
                            >
                                {!file && <ImageIcon color = {THEME.colors.white[0]} size = "70px"/>}
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
                        value = {inputValues.preambleHTML}
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
                        margin = "1rem 0"
                        handleChange = {handleChange}
                    />
                </TopFormWrapper>

                <EffortWrapper>
                    <FlexRow>
                        <Label for = "difficulty" > Svårighetsgrad: </Label>
                        <DifficultyInput handleChange = {handleChange} difficulty = {inputValues.difficulty}/>
                    </FlexRow>
                    <FlexRow>
                        <Label for = "CookingTime"> Tidsåtgång: </Label>
                        <CookingTimeInput handleChange = {handleChange} cookingTime = {inputValues.cookingTime}/>
                    </FlexRow>
                </EffortWrapper>

                <CategoriesInput inputValues = {inputValues} updateInputValues = {setInputValues}/>
                
                <FlexRow $style = {{margin: '3.5rem 0 0.5rem 0'}}>
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