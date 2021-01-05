import {useEffect, useHistory, useState} from 'react';
import { styled } from 'styletron-react';
import InputField from '../inputField'

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
        portions: null,
        cookingTime: '',
        difficulty: '',
        ingredients: [],
        cookingSteps: [],
        mdsaCategories: [],
        author: '',
        isShared: false
    });

    //stores file-data that goes up to image-bucket at server
    const [file, setFile] = useState(null);

    const history = useHistory;

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

    console.log('inputValues', inputValues);

    return(
        <Wrapper>
            <FormWrapper>
                <InputField 
                    type = "text"  
                    name = "username" 
                    label = "Användarnamn (unikt):"
                    handleChange = {handleChange}
                />

                <InputField 
                    type = "password" 
                    name = "password" 
                    label = "Lösenord:"
                    handleChange = {handleChange}
                />
                
                <InputField 
                    type = "text" 
                    name = "firstName" 
                    label = "Förnamn:"
                    handleChange = {handleChange}
                />

                <InputField 
                    type = "text"  
                    name = "lastName" 
                    label = "Efternamn:" 
                    handleChange = {handleChange}
                />
                <InputField 
                    $as = "textarea" 
                    name = "userInfo" 
                    label = "Berätta något om dig själv?"
                    rows="4" 
                    cols="80"  
                    handleChange = {handleChange}
                />

                <InputField 
                    type = "file" 
                    name = "image" 
                    label = "Profilbild:"
                    accept = "image/*"
                    handleChange = {(event) => setFile(event.target.files[0])}
                /> 
                
                <Button onClick = {handleSubmit}>Register</Button>
            </FormWrapper>
        </Wrapper>
    )
};

export default RecipeTemplate;