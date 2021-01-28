import { useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from '../../../config/theme';
import media from '../../../config/media';
import InputField from '../../inputField';
import AuthenticationContext from '../../../contexts/authentication/context';

const Wrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    rowGap: '15px',
    padding: '30px 25px 25px 25px',
    margin: '20px 0 0 0',
    backgroundColor: THEME.colors.white[0],
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '0 0 3px black',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    fontWeight: 500,
    letterSpacing: '0.05rem',

    [media.above.mobile] : {
        width: '430px',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        columnGap: '15px',
    }
});

const Button = styled('button', ({$unactive, $preState}) => ({
    height: '40px',
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
        backgroundColor: $preState ? THEME.colors.contrast[0] : THEME.colors.contrast[1],
        color: THEME.colors.white[0],
    },

    ':hover': {
        cursor: $unactive? 'not-allowed' : 'pointer',
        backgroundColor: $unactive? THEME.colors.contrast[1] : THEME.colors.black[0] 
    }
}));

const Text = styled('p', {
    ':hover': {
        cursor:'pointer',
        color: THEME.colors.contrast[0]
    }
});

const ErrorMessage = styled('p', {
    gridRow: '4/5',
    width: '180px',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.Xsmall,
    color: THEME.colors.error,
    letterSpacing: '0.05rem',
    fontWeight: 700,
    textAlign: 'center',

    [media.above.mobile] : {
        gridColumn: '1/3',
        width: '100%',
        fontSize: THEME.fontSizes.small,
    }
})

const LogInUser = ({handleClick}) => {
    //TODO Add functionality
    const [inputValues, setInputValues] = useState({
        username: '',
        password: '',
    });

    //Helps to hold redirect until fetch is done so user isn't null onload of userpage
    // eslint-disable-next-line no-unused-vars
    const [loginError, setLoginError] = useState({
        isOk: true,
        message: ''
    });

    let history = useHistory();
    const { isAuthenticated, login, user } = useContext(AuthenticationContext);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValues({
            ...inputValues,
            [name]: value,
          });
    };

    const validateInput = () => {
        const validation = inputValues.password.length >= 4 && inputValues.username.length >= 4
        
        if(!validation){
            return true
        }else{
            return false
        }
    }

    const handleLoginReq = async() => {
        await login(inputValues.username, inputValues.password);
        if(!isAuthenticated){
            setLoginError({
                isOk: false,
                message: "Användarnamn och/eller lösenord är felaktigt"
            });
        } else {
            setLoginError({
                isOk: true,
                message: ""
            });
            history.push(`/user/${user._id}`);
            setInputValues({username: '', password: ''}); 
        };
    };
    
    return(
        <Wrapper>
            <InputField 
                type = "text"  
                name = "username" 
                label = "Användarnamn:"
                styling = "basic"
                handleChange = {handleChange}
            />
            <InputField 
                type = "password" 
                name = "password" 
                label = "Lösenord:"
                styling = "basic"
                handleChange = {handleChange}
            />
            <Button 
                onClick = {handleLoginReq} 
                disabled = {validateInput()}
                $unactive = {validateInput()}
                $preState = {inputValues.username <= 0 && inputValues.password <= 0}
            > 
            Logga in 
            </Button>
            <Text onClick = {handleClick}> Inte medlem? <br/> Registrera dig gratis här </Text>
            {!loginError.isOk && <ErrorMessage>{loginError.message}</ErrorMessage>}
            
        </Wrapper>
    );
};

export default LogInUser
