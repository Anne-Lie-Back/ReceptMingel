import { useContext, useEffect,  useState} from 'react';
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

const Button = styled('button', {
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

    ':hover': {
        cursor:'pointer',
        backgroundColor:THEME.colors.black[0] 
    }
});

const Text = styled('p', {
    ':hover': {
        cursor:'pointer',
        color: THEME.colors.contrast[0]
    }
});

const LogInUser = ({handleClick}) => {
    const [didMount, setDidMount] = useState(false); 
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

    //To make sure that if the component is unmounted it is not trying to fetch something.
    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, [])

    if(!didMount) {
        return null;
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValues({
            ...inputValues,
            [name]: value,
          });
    };

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
            <Button onClick = {handleLoginReq}> Logga in </Button>
            <Text onClick = {handleClick}> Inte medlem? <br/> Registrera dig gratis här </Text>
        </Wrapper>
    );
};

export default LogInUser
