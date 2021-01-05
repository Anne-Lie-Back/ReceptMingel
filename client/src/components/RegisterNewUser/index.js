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
    const [inputValue, setInputValues] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        userInfo: '',
        image: ''
    });

    const [file, setFile] = useState(null);
    //const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValues({
            ...inputValue,
            [name]: value,
          });
    }

    useEffect(() => {
        if (!file) return;
    
        const formData = new FormData();
        formData.append("image", file);
    
        fetch("http://localhost:8080/api/images", {
            method: 'POST',
            credentials: "include",
            body: formData
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.message === "success") {
              setInputValues((prev) => ({ ...prev, image: data.id }));
            }
          })
      }, [file]);

    const handleSubmit = () => {

        const userToRegister = {
            username: inputValue.username,
            password: inputValue.password,
            firstName: inputValue.firstName,
            lastName: inputValue.lastName,
            userInfo: inputValue.userInfo,
            image: file
        }

        fetch('http://localhost:8080/api/users/', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(userToRegister)
        })
        .then((res) => {
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
                <InputField type = "text" autofocus name = "username" id= "username" onChange = {(event) => handleChange(event)}></InputField>

                <label for = "password">Lösenord:</label>
                <InputField type = "password" name = "password" id = "password" onChange = {(event) => handleChange(event)}></InputField>

                <label for = "firstName">Förnamn:</label>
                <InputField type = "text" name = "firstName" id = "firstName" onChange = {(event) => handleChange(event)}></InputField>

                <label for = "lastName">Efternamn: </label>
                <InputField type = "text"  name = "lastName" id = "lastName" onChange = {(event) => handleChange(event)}></InputField>

                <label for = "userInfo">Berätta något om dig själv?</label>
                <InputField $as = "textarea" rows="4" cols="80" name = "userInfo" id = "userInfo" onChange = {(event) => handleChange(event)}></InputField>

                <label for = "image">Profilbild:</label>
                <InputField 
                    type = "file" 
                    name = "image" 
                    accept = "image/*"
                    onChange = {(event) => setFile(event.target.files[0])}
                />

                <Button onClick = {handleSubmit}>Register</Button>
            </FormWrapper>
        </Wrapper>
    )
};

export default RegisterNewUser;