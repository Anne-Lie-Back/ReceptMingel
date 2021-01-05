import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from 'styletron-react';

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

const InputField = styled('input', {
    marginBottom: '1rem'
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

const RegisterNewUser = () => {
    const [inputValues, setInputValues] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        image: null,
        userInfo: ''
    });

    //stores file-data that goes up to image-bucket at server
    const [file, setFile] = useState(null);
    
    const history = useHistory();

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
        fetch('http://localhost:8080/api/users/', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(inputValues)
        })
        .then((res) => {
            //if response is good the user will be redirected to their userpage
            if(res.ok) history.push('/user');
            res.json()
        })
        .catch((error) => {
            console.log('error', error);
        })
    };

    return(
        <Wrapper>
            <FormWrapper>
                <label for = "username">Användarnamn (unikt):</label>
                <InputField 
                    type = "text" 
                    autofocus 
                    name = "username" 
                    id= "username" 
                    onChange = {(event) => handleChange(event)}
                />

                <label for = "password">Lösenord:</label>
                <InputField 
                    type = "password" 
                    name = "password" 
                    id = "password" 
                    onChange = {(event) => handleChange(event)}
                />

                <label for = "firstName">Förnamn:</label>
                <InputField 
                    type = "text" 
                    name = "firstName" 
                    id = "firstName" 
                    onChange = {(event) => handleChange(event)}
                />

                <label for = "lastName">Efternamn: </label>
                <InputField 
                    type = "text"  
                    name = "lastName" 
                    id = "lastName" 
                    onChange = {(event) => handleChange(event)}
                />

                <label for = "userInfo">Berätta något om dig själv?</label>
                <InputField 
                    $as = "textarea" 
                    name = "userInfo" 
                    id = "userInfo"
                    rows="4" 
                    cols="80"  
                    onChange = {(event) => handleChange(event)}/>

                <label for = "image">Profilbild:</label>
                <InputField 
                    type = "file" 
                    name = "image" 
                    id = "image"
                    accept = "image/*"
                    onChange = {(event) => setFile(event.target.files[0])}
                />

                <Button onClick = {handleSubmit}>Register</Button>
            </FormWrapper>
        </Wrapper>
    )
};

export default RegisterNewUser;