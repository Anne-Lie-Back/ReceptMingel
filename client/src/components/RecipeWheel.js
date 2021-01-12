import { styled } from 'styletron-react';
import THEME from './../config/theme';
import RecipeCardSmall from './RecipeCardSmall';
import owlTest from './../assets/images/owlTest.jpg'
import imageTest from './../assets/images/imageTest.png';

const Wrapper = styled('div', {
    width: '100%',
    height: '280px',
    backgroundColor: THEME.colors.grey[0],
});

const Banner = styled('div', {
    width: '100%',
    height: '35px',
    padding: '0.7rem 2rem 0.20rem 2rem',
    backgroundColor: THEME.colors.primary[0],
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.large,
    color: THEME.colors.white[0],
    textAlign: 'left'
});

const ScrollWrapper = styled('div', {

    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '245px',
    //padding: '0 0.5rem',
    overflowX: 'scroll',
    overflowY: 'hidden'
    /*     '::-webkit-scrollbar' : {
        display: 'none'
    } */
});

const RecipeWheel = () => {
    const testingTitle = "In Progress"

    const textWheel = [
        {
            title: 'uggla',
            image: owlTest
        },
        {
            title: 'gubbröra',
            image: imageTest
        },
        {
            title: 'uggla',
            image: owlTest
        },
        {
            title: 'gubbröra',
            image: imageTest
        },
        {
            title: 'uggla',
            image: owlTest
        },
        {
            title: 'gubbröra',
            image: imageTest
        },
        {
            title: 'uggla',
            image: owlTest
        },
        {
            title: 'gubbröra',
            image: imageTest
        },
        {
            title: 'uggla',
            image: owlTest
        },
        {
            title: 'gubbröra',
            image: imageTest
        },
        {
            title: 'uggla',
            image: owlTest
        },
        {
            title: 'gubbröra',
            image: imageTest
        },
        
    ]
    
    return(
        <Wrapper>
            <Banner>
                ...{testingTitle}
            </Banner>
            <ScrollWrapper>
            {textWheel.map((item, index) => (
                <RecipeCardSmall key = {index} title = {item.title} image = {item.image}/>
            ))}   
            </ScrollWrapper>
        </Wrapper>
    );
};

export default RecipeWheel;