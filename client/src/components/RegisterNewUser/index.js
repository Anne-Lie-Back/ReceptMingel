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
    return(
        <Wrapper>
            <FormWrapper>
                <label for = "username">Användarnamn (unikt):</label>
                <InputField type = "text" autofocus name = "username" id= "username"></InputField>

                <label for = "password1">Lösenord:</label>
                <InputField type = "password" name = "password1" id = "password1"></InputField>

                <label for = "password2">Upprepa lösenord:</label>
                <InputField type = "password" name = "password2" id= "password2"></InputField>

                <label for = "firstname">Förnamn:</label>
                <InputField type = "text" name = "firstname" id = "firstname"></InputField>

                <label for = "lastname">Efternamn: </label>
                <InputField type = "text"  name = "lastname" id = "lastname"></InputField>

                <label for = "avatar">Profilbild:</label>
                <InputField type = "text" name = "avatar" id = "avatar"></InputField>

                <label for = "userInfo">Berätta något om dig själv?</label>
                <InputField type = "text" name = "userInfo" id = "userInfo"></InputField>

                <Button>Register</Button>
            </FormWrapper>
        </Wrapper>
    )
};

export default RegisterNewUser;