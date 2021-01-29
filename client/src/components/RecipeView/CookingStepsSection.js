import { styled } from 'styletron-react';
import THEME from './../../config/theme';

const ListContentWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '3rem 0'
});

const ListItem = styled('li', {
    margin: '1rem 0 0 1.65rem', 
    fontSize: THEME.fontSizes.Xsmall,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 500,
    letterSpacing: '0.05rem',
    lineHeight: '167%',
    counterIncrement: 'item',

    '::marker' : {
        content: 'counter(item) ".   "',
        paddingRight: '1rem',
        fontFamily: THEME.fonts.text,
        fontWeight: 700,
    },

    "@media screen and (min-width: 700px)": {
        fontSize: THEME.fontSizes.small,
        margin: '1.5rem 0 0 1.65rem', 
    },
});

const HeadlineMedium = styled ('h3', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0], 
    fontSize: THEME.fontSizes.small,
    fontWeight: 700,
    letterSpacing: '0.05rem',

    "@media screen and (min-width: 700px)": {
        fontSize: THEME.fontSizes.normal,
        margin: '1.5rem 0 0 1.65rem', 
    },
});

const CookingStepsSection = ({cookingSteps}) => (
    <ListContentWrapper>
        <HeadlineMedium>Gör så här:</HeadlineMedium>
        <ol 
            style = {{
                listStyle: 'none',
                counterReset: 'item',
                }}>
            {cookingSteps.map((item, index) => (
                <ListItem key = {index}>
                    {item}
                </ListItem>
            ))}
        </ol>
    </ListContentWrapper>
);

export default CookingStepsSection;