import { styled } from 'styletron-react';
import THEME from './../../config/theme';
import media from '../../config/media';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '2rem',

    [media.above.tablet] : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '4rem 1.5rem 3rem 0',
    }
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '2rem 0',

    [media.above.tablet] : {
        margin: '4rem 1.5rem 3rem 0',
    }
});

const HeadlineSmall = styled ('h4', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontSize: THEME.fontSizes.small,
    fontWeight: 700,
    letterSpacing: '0.05rem'
});

const Text = styled('p', {
    margin: '0 0 0 1rem', 
    fontSize: THEME.fontSizes.small,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 500,
    lineHeight: '167%',
    letterSpacing: '0.05rem'
});

const CategoryContainer = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '390px',
    height: '100%',
});

const CategoryBox = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    width: '120px',
    margin: '0 0.5rem 0.5rem 0',
    padding: '0.5rem 0.5rem',
    backgroundColor: THEME.colors.primary[1],
    border: `1px solid ${THEME.colors.black[0]}`,
    fontSize: THEME.fontSizes.Xsmall,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 500,
    letterSpacing: '0.05rem',
    textTransform: 'uppercase',
});

const BottomSection = ({categories, author}) => (
    <Wrapper>
        <CategoryContainer>
                {categories.map((item, index) => (
                    <CategoryBox key = {index}>{item}</CategoryBox>  
                ))}
        </CategoryContainer>
        <FlexRow>
        <HeadlineSmall>Författat av:</HeadlineSmall>
            <Text>{author}</Text>
        </FlexRow>
    </Wrapper>
);

export default BottomSection;