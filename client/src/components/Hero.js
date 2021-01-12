import { styled } from 'styletron-react';
import THEME from './../config/theme';
import heroImage from '../assets/images/heroImage.jpg';

const Wrapper = styled('div', ({$image}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '600px',
    backgroundImage: `url(${$image})` || `url(${heroImage})`,
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
        <TitleWrapper>
            <Title>{title}</Title>
            {icon}
            {children}
        </TitleWrapper>
    </Wrapper>
);

export default Hero;