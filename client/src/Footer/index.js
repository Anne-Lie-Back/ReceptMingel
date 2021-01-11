import { styled } from 'styletron-react';
import THEME from '../config/theme';
import Icons from '../config/icons';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    width: '100%',
    padding: '0 2rem',
    backgroundColor: THEME.colors.primary[0],
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.small,
    color: THEME.colors.white[0],
});

const TextWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '2rem 0 3rem 0',
    textAlign: 'center',
    lineHeight: '20px',
});

const BottomWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '0.5rem'
});

const FooterLogo = styled('div', {
    fontFamily: THEME.fonts.special,
    fontSize: THEME.fontSizes.normal,
    color: THEME.colors.white[0],
    letterSpacing: '0.05rem',
    textShadow: '0 0 2px black',
    fontWeight: 400
});

const CopyrightWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
});

const LinkedinLink = styled('a', {
    display: 'flex',
    flexDirection: 'row',
    width: '95px',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: THEME.colors.white[0],
    textDecoration: 'none'
});

const Footer = () => {
    const {
        CopyrightIcon,
        LinkedinIcon
    } = Icons;

    return(
        <Wrapper>
            <TextWrapper>
                <p>Detta är ett examensarbete av Anne-Lie Bäck.
                <br/>Medieinstitutet, Göteborg
                <br/>Skapat Januari 2021</p>
            </TextWrapper>
            <BottomWrapper>
                <FooterLogo>ReceptMingel</FooterLogo>
                <LinkedinLink
                    href = 'http://www.linkedin.com/in/anne-lie-bäck-8648638b'
                    target = '_blank'
                >   
                    <p>Jag finns på </p>
                    <LinkedinIcon  
                        color = {THEME.colors.white[0]} 
                        size = '20px'
                    />
                </LinkedinLink>
                <CopyrightWrapper>
                    <CopyrightIcon color = {THEME.colors.white[0]} size = {THEME.fontSizes.normal}/>
                    <p>2021 Anne-Lie Bäck</p>
                </CopyrightWrapper>
            </BottomWrapper>
        </Wrapper>
    );
};

export default Footer;