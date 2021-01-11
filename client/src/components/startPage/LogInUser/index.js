import { useState} from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from 'styletron-react';
import InputField from '../../inputField'

const Wrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    columnGap: '15px',
    rowGap: '15px',
    width: '430px',
    height: '180px',
    padding: '30px',
    marginTop: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '0 0 3px black'
});

const Button = styled('button', {
    height: '40px',
    backgroundColor: 'orange',
    color: 'white',
    textTransform: 'uppercase',

    ':hover': {
        cursor:'pointer',
        backgroundColor:'darkorange' 
    }
})

const Text = styled('p', {
    ':hover': {
        cursor:'pointer',
        color:'darkorange' 
    }
});

const LogInUser = ({handleClick}) => {
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
            <Button> Logga in </Button>
            <Text onClick = {handleClick}> Inte medlem? <br/> Registrera dig gratis här </Text>
    </Wrapper>
    );
};

export default LogInUser
