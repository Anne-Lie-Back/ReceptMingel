import { useState } from 'react';
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
        firstname: '',
        lastname: '',
        avatar: '',
        userInfo: ''
    });
    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValues({
            ...inputValue,
            [name]: value,
          });
    }

    const handleSubmit = () => {
        console.log('inputValues', inputValue);
    }

    return(
        <Wrapper>
            <FormWrapper>
                <label for = "username">Användarnamn (unikt):</label>
                <InputField type = "text" autofocus name = "username" id= "username" onChange = {(event) => handleChange(event)}></InputField>

                <label for = "password">Lösenord:</label>
                <InputField type = "password" name = "password" id = "password" onChange = {(event) => handleChange(event)}></InputField>

                <label for = "firstname">Förnamn:</label>
                <InputField type = "text" name = "firstname" id = "firstname" onChange = {(event) => handleChange(event)}></InputField>

                <label for = "lastname">Efternamn: </label>
                <InputField type = "text"  name = "lastname" id = "lastname" onChange = {(event) => handleChange(event)}></InputField>

                <label for = "avatar">Profilbild:</label>
                <InputField type = "text" name = "avatar" id = "avatar" onChange = {(event) => handleChange(event)}></InputField>

                <label for = "userInfo">Berätta något om dig själv?</label>
                <InputField type = "text" name = "userInfo" id = "userInfo" onChange = {(event) => handleChange(event)}></InputField>

                <Button onClick = {handleSubmit}>Register</Button>
            </FormWrapper>
        </Wrapper>
    )
};

export default RegisterNewUser;