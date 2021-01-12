import { styled } from 'styletron-react';
import THEME from './../config/theme';
import Hero from './../components/Hero';
import RecipeWheel from './../components/RecipeWheel';
import heroImage from '../assets/images/heroImage.jpg';
import imageTest from '../assets/images/imageTest.png';

const Avatar = styled('div', ({$avatar}) => ({
    width: '290px',
    height: '290px',
    margin: '1.5rem',
    borderRadius: '50%',
    backgroundImage: `url(${$avatar})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
    boxShadow: '0 0 5px black'
}));

const DescWrapper = styled('div', {
    width: '500px',
    height: '320px',
    margin: '1.5rem',
    padding: '1rem 2rem',
    backgroundColor: THEME.colors.white[0],
    borderRadius: '5px',
    boxShadow: '0 0 5px black',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    color: THEME.colors.black[0],
    lineHeight: '30px'
});

const ContentWrapper = styled('div', {
    width: '100%',
    height: '1000px',
    backgroundColor: THEME.colors.white[0]
});


const UserPage = () => {
    const userDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    return(
        <>
            <Hero image = {heroImage}>
                <Avatar $avatar = {imageTest}/>
                <DescWrapper>
                    {userDesc}
                </DescWrapper>
            </Hero>
            <ContentWrapper>
                <RecipeWheel/>
            </ContentWrapper>
        </>
    );
};

export default UserPage;