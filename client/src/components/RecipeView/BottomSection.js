import { styled } from 'styletron-react';
import THEME from './../../config/theme';

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '4rem 1.5rem 3rem 0'
});

const HeadlineSmall = styled ('h4', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontSize: THEME.fontSizes.small,
    fontWeight: 700,
    letterSpacing: '0.05rem'
});

const Text = styled('p', {
    marginLeft: '1rem', 
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
    maxWidth: '465px',
    height: '30px',
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
    <FlexRow>
        <CategoryContainer>
                {categories.map(item => (
                    <CategoryBox>{item}</CategoryBox>  
                ))}
        </CategoryContainer>
        <FlexRow>
        <HeadlineSmall>Författat av:</HeadlineSmall>
            <Text>{author}</Text>
        </FlexRow>
    </FlexRow>
);

export default BottomSection;