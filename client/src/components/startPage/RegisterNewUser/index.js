import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from 'styletron-react';
import InputField from '../../inputField'

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '430px',
    height: '440px',
    padding: '30px',
    marginTop: '7%',
    backgroundColor: '#ffffff',
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '0 0 3px black'
})

const Button = styled('button', {
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
    width: '100%',
    textAlign: 'center',
    ':hover': {
        cursor:'pointer',
        color:'darkorange' 
    }
});

const RegisterNewUser = ({handleClick}) => {
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

    console.log('inputValues', inputValues);

    return(
        <Wrapper>
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
                <Text onClick = {handleClick}>Redan registrerad? Logga in här</Text>
        </Wrapper>
    )
};

export default RegisterNewUser;