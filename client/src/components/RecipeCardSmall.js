import { styled } from 'styletron-react';
import THEME from './../config/theme';

const Wrapper = styled('div', {
    width: '240px',
    height: '200px',
    margin: '0.5rem 0.5rem',
    backgroundColor: THEME.colors.white[0],
    borderRadius: '5px',
    boxShadow: '0 0 5px black',
});

const ImageContainer = styled('div', ({$image}) => ({
    width: '240px',
    height: '160px',
    backgroundImage: `url(${$image})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
}));

const TitleWrapper = styled('div', {
    width: '100%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
});

const Title = styled('h3', {
    marginLeft: '1.5rem',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    fontWeight: 400,
    color: THEME.colors.black[0],
    textTransform: 'capitalize'
});

const RecipeCardSmall = ({image, title}) => (
    <Wrapper>
        <ImageContainer $image = {image}/> 
        <TitleWrapper>
            <Title> {title} </Title>
        </TitleWrapper>
    </Wrapper>
);

export default RecipeCardSmall;