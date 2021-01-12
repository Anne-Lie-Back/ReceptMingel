import { styled } from 'styletron-react';
import THEME from './../config/theme';
import heroImage from '../assets/images/heroImage.jpg';

const Wrapper = styled('div', ({$image}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '600px',
    //if no image is recieved, i will use a default for hero
    backgroundImage: $image? `url(${$image})` : `url(${heroImage})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
}));

const TitleWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
});

const Title = styled('h2', {
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.largeHeader,
    color: THEME.colors.white[0]
});

const Hero = ({children, image, title, icon}) => (
    <Wrapper $image = {image}>
        {console.log('image', image)}
        <TitleWrapper>
            {title && <Title>{title}</Title>}
            {icon && <Title>{title}</Title>}
            {children}
        </TitleWrapper>
    </Wrapper>
);

export default Hero;