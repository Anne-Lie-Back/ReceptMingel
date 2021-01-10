import { useState} from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from 'styletron-react';
import InputField from '../../inputField'

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '430px',
    height: '200px',
    padding: '30px',
    marginTop: '15%',
    backgroundColor: '#ffffff',
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '0 0 3px black'
});

const InputWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
});

const Button = styled('button', {
    //width: '50px',
    flexGrow: 1,
    height: '50px',
    padding: '1rem 2rem',
    margin: '1rem 0',
    backgroundColor: 'orange',
    color: 'white',
    textTransform: 'uppercase',

    ':hover': {
        cursor:'pointer',
        backgroundColor:'darkorange' 
    }
})

const Text = styled('p', {
    flexGrow: 1,
});

const LogInUser = () => {
    //TODO Add functionality
    const [inputValues, setInputValues] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValues({
            ...inputValues,
            [name]: value,
          });
    }

    return(
        <Wrapper>
            <InputWrapper>
                <InputField 
                    type = "text"  
                    name = "username" 
                    label = "Användarnamn:"
                    handleChange = {handleChange}
                />
                <InputField 
                    type = "password" 
                    name = "password" 
                    label = "Lösenord:"
                    handleChange = {handleChange}
                />
            </InputWrapper>
            <InputWrapper>
                <Button> Logga in </Button>
                <Text>Inte medlem? <br/> Registrera dig gratis här</Text>
            </InputWrapper>
    </Wrapper>
    );
};

export default LogInUser
