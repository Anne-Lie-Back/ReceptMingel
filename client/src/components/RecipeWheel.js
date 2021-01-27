import { Link } from 'react-router-dom';
import { styled } from 'styletron-react';
import THEME from './../config/theme';
import RecipeCardSmall from './RecipeCardSmall';
//TODO remove:
import owlTest from './../assets/images/owlTest.jpg'
import imageTest from './../assets/images/imageTest.png';

const Wrapper = styled('div', ({$height}) => ({
    width: '100%',
    height: $height || '280px',
    backgroundColor: THEME.colors.white[0],
}));

const Banner = styled('div', {
    width: '100%',
    height: '30px',
    padding: '0.5rem 1rem 0.20rem 2rem',
    backgroundColor: THEME.colors.primary[0],
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.medium,
    color: THEME.colors.white[0],
    textAlign: 'left',
    letterSpacing: '0.07rem'
});

const ScrollWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '230px',
    overflowX: 'scroll',
    overflowY: 'hidden',
    //Puts the scrollbar on top of div
    transform: 'rotateX(180deg)',
    //TODO check if I need this
    //'-ms-transform':'rotateX(180deg)', /* IE 9 */
    //'-webkit-transform':'rotateX(180deg)', 

    '::-webkit-scrollbar' : { 
        //'-webkit-appearance': 'none',
        height: '0.7rem',
        backgroundColor: THEME.colors.grey[0]
    },

    '::-webkit-scrollbar-thumb' : {
        borderRadius: '2px',
        border: `1px solid grey`,
        backgroundColor: THEME.colors.secondary[0]  
    },
    ':hover::-webkit-scrollbar-thumb' : {
        backgroundColor: THEME.colors.secondary[2],
    }
});

const StyledLink = styled(Link, {
    textDecoration: 'none',

    ':hover' : {
        color: THEME.colors.contrast[0],
        cursor: 'pointer'
    }

})

// Flips the content of the rotated div once again so the content is not upside down.
const Flip = styled('div', {
    transform: 'rotateX(180deg)',
});

const RecipeWheel = ({bannerTitle, height, recipeList, route}) => (
    <Wrapper $height = {height}>
        {console.log('LISTA', recipeList)}
        <Banner>
            {bannerTitle}...
        </Banner>
        <ScrollWrapper>
        {recipeList.map((item) => (
            <Flip>
                <StyledLink to = {`${route + item._id}`}>
                    <RecipeCardSmall key = {item._id} title = {item.title} image = {item.imageURL}/>
                </StyledLink>
            </Flip>
        ))}   
        </ScrollWrapper>
    </Wrapper>
);

export default RecipeWheel;