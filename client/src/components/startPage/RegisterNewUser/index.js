import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from '../../../config/theme';
import media from '../../../config/media'
import AuthenticationContext from '../../../contexts/authentication/context'
import Icons from '../../../config/icons';

import InputField from '../../inputField';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '30px',
    margin: '25% 0 1rem 0',
    backgroundColor: '#ffffff',
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '0 0 3px black',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    fontWeight: 500,
    letterSpacing: '0.05rem',

    [media.above.mobile] : {
        width: '430px',
        margin: '15% 0 0 0',
    },

    [media.above.tablet] : {
        width: '430px',
        margin: '10% 0 0 0',
    },

    [media.above.laptop] : {
        margin: '8% 0 0 0',
    },
});

const Button = styled('button', ({$unactive}) =>({
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

    ':disabled' : {
        backgroundColor: THEME.colors.contrast[1],
        color: THEME.colors.white[0],
    },
    ':hover': {
        cursor: $unactive? 'not-allowed' : 'pointer',
        backgroundColor: $unactive? THEME.colors.contrast[1] : THEME.colors.black[0] 
    }
}));

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

const FileUpload = styled('div', ({$preview, $error}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: $error? `2px solid red` : 'none',
    backgroundImage: $preview? `url(${$preview})` : null,
    backgroundColor: THEME.colors.grey[0],
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',

    ':hover' : {
        backgroundColor: THEME.colors.black[0],
        cursor: 'pointer'
    }
}));

const ErrorMessage = styled('p', {
    width: '180px',
    margin: '0 0 0.4rem 0',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    color: THEME.colors.error,
    letterSpacing: '0.05rem',
    fontWeight: 700,
    textAlign: 'center',

    [media.above.mobile] : {
        width: '100%',
    }
})

const RegisterNewUser = ({handleClick}) => {

    const [inputValues, setInputValues] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        image: null,
        userInfo: ''
    });
    
    const [loginError, setLoginError] = useState({
        isOk: true,
        message: ''
    });

    //stores file-data that goes up to image-bucket at server
    const [file, setFile] = useState(null);

    const [imageOK, setImageOK] = useState({
        isError: false,
        message: '' 
    })

    const {registerNewUser, user, isAuthenticated} = useContext(AuthenticationContext);

    const history = useHistory();

    const { ImageIcon } = Icons;

    //handle input-changes
    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    const validationHandler = () => {

        const validate = 
            inputValues.username.length >= 4 &&
            inputValues.password.length >= 4 &&
            inputValues.firstName.length >= 2 &&
            inputValues.lastName.length >= 2

        if (validate) {
            return false
        } else {
            return true
        }
    };

    const handleSubmit = async () => {
        //TODO remove when new is tested
        /* await registerNewUser(inputValues);
        if(!isAuthenticated){
            setLoginError({
                isOk: false,
                message: "Vi kunde"
            });
        } else {
            setLoginError({
                isOk: true,
                message: ""
            });
            history.push(`/user/${user._id}`); 
        }; */
        const message = await registerNewUser(inputValues);
        if (message !== "Authenticated") {
            setLoginError({
                isOk: false,
                message: message
            });
        } else {
            setLoginError({
                isOk: true,
                message: ""
            });
            history.push(`/user/${user._id}`); 
        }
    };

    //Listens after changes to file-state. If changed to not null, the image will be sent to the bucket and id 
    // set to inputValues.image to link correct image in bucket to user in database.
    useEffect(() => {
        if (!file) return;
        
        const formData = new FormData();
        formData.append("image", file);
    
        fetch('https://receptmingel.herokuapp.com/api/images', {
            method: "POST",
            credentials: "include",
            body: formData, 
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.message === "success") {  
                console.log('data.message', data.message)
              setInputValues((prev) => ({ ...prev, image: data.id }));
              setImageOK(!imageOK.isError)
            } else {
                setImageOK({ isError: true, message: "För stor, max 500kb" })
            }
          })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    return(
        <Wrapper>
                <InputField 
                    type = "text"  
                    name = "username" 
                    label = "Användarnamn (unikt)"
                    styling = "basic"
                    margin = "0 0 0.5rem 0"
                    isRequired = {true}
                    handleChange = {handleChange}
                />

                <InputField 
                    type = "password" 
                    name = "password" 
                    label = "Lösenord (minst 4 tecken)"
                    styling = "basic"
                    margin = "0.5rem 0"
                    isRequired = {true}
                    handleChange = {handleChange}
                />
                
                <InputField 
                    type = "text" 
                    name = "firstName" 
                    label = "Förnamn"
                    styling = "basic"
                    margin = "0.5rem 0"
                    isRequired = {true}
                    handleChange = {handleChange}
                />

                <InputField 
                    type = "text"  
                    name = "lastName" 
                    label = "Efternamn" 
                    styling = "basic"
                    margin = "0.5rem 0"
                    isRequired = {true}
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

                <FileUploadWrapper>
                        <label htmlFor="upload-image" style = {{height: '100%'}}>
                            <FileUpload
                                $error = {imageOK.isError}
                                 $preview = {
                                    file && !imageOK.isError && URL.createObjectURL(file)
                                }
                            >
                                {!file && <ImageIcon color = {THEME.colors.white[0]} size = "70px"/>}
                            </FileUpload>
                        
                        <p style = {{textAlign: 'center'}}> {imageOK.isError?(imageOK.message) : (file && file.name )}</p>

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
                
                <Button $unactive = {validationHandler()} disabled = {validationHandler()} onClick = {handleSubmit}>Register</Button>
                <ErrorMessage>{loginError.message}</ErrorMessage>
                <Text onClick = {handleClick}>Redan registrerad? Logga in här</Text>
        </Wrapper>
    )
};

export default RegisterNewUser;