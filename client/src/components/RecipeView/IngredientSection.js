import { styled } from 'styletron-react';
import THEME from '../../config/theme';

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4rem'
});

const HeadlineSmall = styled ('h4', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontSize: THEME.fontSizes.Xsmall,
    fontWeight: 700,
    letterSpacing: '0.05rem',
    "@media screen and (min-width: 700px)": {
        fontSize: THEME.fontSizes.small,
    },
});

const HeadlineMedium = styled ('h3', {
    marginBottom: '0.5rem',
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0], 
    fontSize: THEME.fontSizes.small,
    fontWeight: 700,
    letterSpacing: '0.05rem',
    "@media screen and (min-width: 700px)": {
        fontSize: THEME.fontSizes.normal,
    },
});

const Text = styled('p', {
    fontSize: THEME.fontSizes.Xsmall,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 500,
    lineHeight: '167%',
    letterSpacing: '0.05rem',
    "@media screen and (min-width: 700px)": {
        fontSize: THEME.fontSizes.small,
    },
});

const PortionBox = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    width: '35px',
    marginLeft: '1rem',
    backgroundColor: THEME.colors.white[0],
    border: `1px solid ${THEME.colors.black[0]}`,
});

const ListContentWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '3rem 0'
});

const ListItem = styled('li', {
    margin: '0.75rem 0 0 0.75rem',
    paddingLeft: '1rem',
    fontSize: THEME.fontSizes.Xsmall,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 500,
    letterSpacing: '0.05rem',
    lineHeight: '167%',
    "@media screen and (min-width: 700px)": {
        margin: '1rem 0 0 0.75rem',
        fontSize: THEME.fontSizes.small,
    },
});

const IngredientSection = ({portions, ingredients}) => (
    <>
        <FlexRow>
            <HeadlineSmall>Portioner:</HeadlineSmall>
            <PortionBox>
                <Text>
                    {portions}
                </Text>
            </PortionBox>
        </FlexRow>
        <ListContentWrapper>
            <HeadlineMedium>Ingredienser:</HeadlineMedium>
            <ul>
                {ingredients.map(item => (
                    <ListItem>{item}</ListItem>
                ))}
            </ul>
        </ListContentWrapper>
    </>
);

export default IngredientSection;