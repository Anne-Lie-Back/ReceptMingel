import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from 'styletron-react';
import Icons from '../../../config/icons';
import THEME from '../../../config/theme';
import InputField from '../../inputField';
import axios from '../../../axios';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '430px',
    //height: '440px',
    padding: '30px',
    marginTop: '7%',
    backgroundColor: '#ffffff',
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '0 0 3px black',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    fontWeight: 500,
    letterSpacing: '0.05rem'
})

const Button = styled('button', {
    height: '40px',
    margin: '1rem 0',
    backgroundColor: THEME.colors.contrast[0],
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 0 1px black',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700,
    letterSpacing: '0.05rem',
    color: THEME.colors.white[0],
    textTransform: 'uppercase',

    ':hover': {
        cursor:'pointer',
        backgroundColor:THEME.colors.black[0] 
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

const FileUploadWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '130px',
    margin: '0.5rem 0',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    fontWeight: 400
});

const FileUpload = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: THEME.colors.grey[0],

    ':hover' : {
        backgroundColor: THEME.colors.black[0],
        cursor: 'pointer'
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

    const { ImageIcon } = Icons;
    
    const history = useHistory();

/*     const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    }; */

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


    const handleSubmit = async () => {
        await axios
        .post('/users', inputValues)
        .then((res) => {
            //if response is good the user will be redirected to their userpage
            if(res.status === 200) history.push('/user');
            console.log(res.data)
        })
        .catch(error => console.log(error))  
    }
    //sends inputvalues to db
    /* const handleSubmit = (event) => {
        event.preventDefault();
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
    }; */

    return(
        <Wrapper>
                <InputField 
                    type = "text"  
                    name = "username" 
                    label = "Användarnamn (unikt):"
                    styling = "basic"
                    margin = "0 0 0.5rem 0"
                    handleChange = {handleChange}
                />

                <InputField 
                    type = "password" 
                    name = "password" 
                    label = "Lösenord:"
                    styling = "basic"
                    margin = "0.5rem 0"
                    handleChange = {handleChange}
                />
                
                <InputField 
                    type = "text" 
                    name = "firstName" 
                    label = "Förnamn:"
                    styling = "basic"
                    margin = "0.5rem 0"
                    handleChange = {handleChange}
                />

                <InputField 
                    type = "text"  
                    name = "lastName" 
                    label = "Efternamn:" 
                    styling = "basic"
                    margin = "0.5rem 0"
                    handleChange = {handleChange}
                />
                <InputField 
                    $as = "textarea" 
                    name = "userInfo" 
                    label = "Berätta något om dig själv?"
                    rows="4" 
                    cols="80" 
                    styling = "box"
                    margin = "0.5rem 0"
                    handleChange = {handleChange}
                />

    {/*                 <InputField 
                        type = "file" 
                        name = "image" 
                        label = "Profilbild:"
                        accept = "image/*"
                        styling = "basic"
                        handleChange = {(event) => setFile(event.target.files[0])}
                    />  */}

                <FileUploadWrapper>
                        <label htmlFor="upload-image" style = {{height: '100%'}}>
                            <FileUpload>
                                <ImageIcon color = {THEME.colors.white[0]} size = "70px"/>
                            </FileUpload>
                            <p style = {{textAlign: 'center'}}>Filnamn.jpeg</p>
                        {/* <p>{file && file.name }</p> */}
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
                
                <Button onClick = {handleSubmit}>Register</Button>
                <Text onClick = {handleClick}>Redan registrerad? Logga in här</Text>
        </Wrapper>
    )
};

export default RegisterNewUser;