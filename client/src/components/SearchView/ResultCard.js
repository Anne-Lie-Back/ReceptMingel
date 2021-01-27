import { styled } from 'styletron-react';
import PartingStrip from '../PartingStrip';
import THEME from '../../config/theme';
import media from '../../config/media';
//TODO change to a real default image
import owlTest from '../../assets/images/owlTest.jpg';

const Wrapper = styled('div', {
    width: '100%',
    maxWidth: '800px',
});

const ContentWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    padding: '0.5rem',

    ':hover': {
        backgroundColor: THEME.colors.contrast[0],
        cursor: 'pointer'
    }
});

const TextWrapper = styled('div', {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: '0 0 0 1rem',
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0]
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

const FlexRowSpecial = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',

    [media.above.tablet] : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

const Title = styled('h3', {
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700
});

const Text = styled('p', {
    fontSize: THEME.fontSizes.Xsmall,
    marginTop: '0.5rem'
});

const EffortBox = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '25px',
    width: '70px',
    margin: '0.75rem 1rem 0 0',
    backgroundColor: THEME.colors.secondary[0],
    border: `1px solid ${THEME.colors.black[0]}`,
    fontFamily: THEME.fonts.text,
    fontSize: '10px',
    fontWeight: 400,

    [media.above.tablet] : {
        margin: '0 0 0 1rem',
    }
});

const Image = styled('div',({$imageURL}) => ({
    width: '120px',
    height: '90px',
    backgroundImage: $imageURL? `url(${$imageURL})` : `url(${owlTest})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
    borderRadius: '5px'
}));

const ResultCard = ({title, imageURL, desc, difficulty, cookingTime, handleClick}) => {
    return(
        <Wrapper>
            <ContentWrapper onClick = {handleClick}>
                <Image $imageURL = {imageURL}/>
                <TextWrapper>
                    <FlexRowSpecial>
                        <Title>
                            {title}
                        </Title>
                        <FlexRow>
                            <EffortBox $style = {{textTransform: 'uppercase'}}>
                                {difficulty}
                            </EffortBox>
                            <EffortBox>
                                {cookingTime}
                            </EffortBox>
                        </FlexRow>
                    </FlexRowSpecial>
                    <Text>
                        {desc}
                    </Text>
                </TextWrapper>
            </ContentWrapper>
            <PartingStrip width = "100%"/>
        </Wrapper>
    );
};

export default ResultCard;