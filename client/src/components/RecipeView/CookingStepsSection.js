import { styled } from 'styletron-react';
import THEME from './../../config/theme';

const ListContentWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '3rem 0'
});

const ListItem = styled('li', {
    margin: '2rem 0 0 1.65rem', 
    fontSize: THEME.fontSizes.small,
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
});

const HeadlineMedium = styled ('h3', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0], 
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700,
    letterSpacing: '0.05rem'
});

const CookingStepsSection = ({cookingSteps}) => (
    <ListContentWrapper>
        <HeadlineMedium>Gör så här:</HeadlineMedium>
        <ol 
            style = {{
                listStyle: 'none',
                counterReset: 'item',
                }}>
            {cookingSteps.map(item => (
                <ListItem>
                    {item}
                </ListItem>
            ))}
        </ol>
    </ListContentWrapper>
);

export default CookingStepsSection;