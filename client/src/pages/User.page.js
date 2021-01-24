import { useContext, useEffect } from 'react'
import { styled } from 'styletron-react';
import THEME from './../config/theme';
import AuthenticationContext from '../contexts/authentication/context';
import Hero from './../components/Hero';
import RecipeWheel from './../components/RecipeWheel';
import imageTest from '../assets/images/imageTest.png';


const Avatar = styled('div', ({$avatar}) => ({
    width: '290px',
    height: '290px',
    margin: '1.5rem',
    borderRadius: '50%',
    backgroundImage: $avatar ? `url(${$avatar})`:`url(${imageTest})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
    boxShadow: '0 0 5px black'
}));

const DescWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-Between',
    width: '500px',
    height: '320px',
    margin: '1.5rem 1.5rem 0 1.5rem',
    padding: '1rem 2rem',
    backgroundColor: THEME.colors.white[0],
    borderRadius: '5px',
    boxShadow: '0 0 5px black',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    color: THEME.colors.black[0],
    lineHeight: '30px'
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
});

const Button = styled('button', {
    marginLeft: '1rem',
    padding: '0.25rem 0.5rem',
    backgroundColor: THEME.colors.contrast[0],
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 0 1px black',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.Xsmall,
    fontWeight: 700,
    letterSpacing: '0.05rem',
    color: THEME.colors.white[0],
    textTransform: 'uppercase',

    ':hover': {
        cursor:'pointer',
        backgroundColor:THEME.colors.black[0] 
    }
});

const ContentWrapper = styled('div', {
    width: '100%',
    backgroundColor: THEME.colors.white[0]
});


const UserPage = () => {
    const { logout, user } = useContext(AuthenticationContext);

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    
    const handleEdit = () => {
        console.log('EDIT ME!');
    };

/*     const handleLogout = () =>{
        logout();
    }
 */
    return(
        <>
            <Hero>
                <Avatar $avatar = {user.imageURL && user.imageURL} />
                <DescWrapper>
                    {user.userInfo}
                    <FlexRow>
                        <Button onClick = {handleEdit}>Uppdatera Profil?</Button>
                        <Button onClick = {() => logout()}>Logga ut?</Button>
                    </FlexRow>
                </DescWrapper>
                    
            </Hero>
            <ContentWrapper>
                <RecipeWheel bannerTitle = "In Progress"/>
                <RecipeWheel bannerTitle = "Senast publicerade"/>
            </ContentWrapper>
        </>
    );
};

export default UserPage;