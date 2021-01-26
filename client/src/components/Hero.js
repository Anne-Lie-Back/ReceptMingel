import { styled } from 'styletron-react';
import THEME from './../config/theme';
import heroImage from '../assets/images/heroImage.jpg';
import { Icon } from "@iconify/react";
import media from './../config/media';

const Wrapper = styled('div', ({$image}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '600px',
    height: '100%',
    //if no image is recieved, It will set a default for hero
    backgroundImage: $image? `url(${$image})` : `url(${heroImage})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',

    [media.above.tablet] : {
        height: '600px',
    }
}));

const TitleWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',

    [media.above.tablet] : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    }
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