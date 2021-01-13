import { styled } from 'styletron-react';
import THEME from './../config/theme';
import heroImage from '../assets/images/heroImage.jpg';
import { Icon } from "@iconify/react";

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
    justifyContent: 'space-between',
    alignItems: 'center'
});

const Title = styled('h2', {
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.hero,
    color: THEME.colors.white[0],
    textShadow: '0 0 1px black'
});

const StyledIcon = styled(Icon, {
    fontSize: '240px',
    color: THEME.colors.white[0],
});

const Hero = ({children, image, title, icon}) => (
    <Wrapper $image = {image}>
        <TitleWrapper>
            {title && <Title>{title}</Title>}
            {icon && <StyledIcon icon={icon}/>}
            {children}
        </TitleWrapper>
    </Wrapper>
);

export default Hero;