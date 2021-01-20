import {useContext, useEffect, useState} from 'react';
import { styled } from 'styletron-react';
import THEME from './../../config/theme';

import { Icon } from "@iconify/react";
import roundStarOutline from '@iconify/icons-ic/round-star-outline';
import roundStarRate from '@iconify/icons-ic/round-star-rate';
import roundRadioButtonUnchecked from '@iconify/icons-ic/round-radio-button-unchecked';
import roundRadioButtonChecked from '@iconify/icons-ic/round-radio-button-checked';
import bxEdit from '@iconify/icons-bx/bx-edit';

import PartingStrip from '../PartingStrip';
import TopSection from './TopSection';
import IngredientSection from './IngredientSection';
import CookingStepsSection from './CookingStepsSection';
import BottomSection from './BottomSection';
import AuthenticationContext from '../../contexts/authentication/context';
import RecipeContext from '../../contexts/recipe/context';

import imageTest from '../../assets/images/imageTest.png'

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '3rem 0',
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1rem'
});

const SpaceBetweenWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
});

const HeadlineSmall = styled ('h4', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontSize: THEME.fontSizes.normal,
    fontWeight: 500,
    letterSpacing: '0.05rem',
});

const RecipeWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '812px',
    margin: '1rem 2rem'
});

const EditIcon = styled(Icon,{
    fontSize: '35px',
    color: THEME.colors.black[0],

    ':hover' : {
        cursor: 'pointer',
        color: THEME.colors.contrast[0],
    }
});

const StarIcon = styled(Icon,({$isStarred})=> ({
    margin: '0 0.5rem 0 -0.3rem',
    fontSize: '40px',
    color: $isStarred ? 'gold' : THEME.colors.black[0],

    ':hover' : {
        cursor: 'pointer',
        color: $isStarred ? THEME.colors.black[0] : THEME.colors.contrast[0],
    }
}));

const SharedIcon = styled(Icon,({$isSharedRecipe})=> ({
    margin: ' 0 0.5rem 0 -0.2rem',
    fontSize: '30px',
    color: $isSharedRecipe ? 'ForestGreen' : THEME.colors.black[0],

    ':hover' : {
        cursor: 'pointer',
        color: THEME.colors.contrast[0],
    }
}));

const RecipeView = ({setIsEdit, slug, isLoading, recipe}) => {
    //TODO assign startvalue from DB - recipe instead
    const [isSharedRecipe, setIsShared] = useState(false);
    const [isStarred, setIsStarred] = useState(false);

    //TODO remove and lift, decide by PROP from parent
    // eslint-disable-next-line no-unused-vars
    const [isSessionUsersRecipe, setSessionUsersRecipe] = useState(false);

    const {user} = useContext(AuthenticationContext)


    //TODO remove
        const recipeTest = {
        title : "Exotiska Tacos",
        preambleHTML : "En fräsch taco med panerad tofu. Den sötstarka mangosalsan ger mycket fraschör. Var inte rädd för att dunka på en del med chilin, mangon och limedressingen tar ut en del styrka. Detta är en perfekt sommar-rätt! ",
        image : imageTest,
        portions : 4,
        cookingTime : "10-20min",
        difficulty : "LÄTT",
        ingredients : [
            "8st panerade torskfiléer",
            "4st Torilllabröd",
            "2st färsk chili",
            "500gr Mango (fryst eller färsk)",
            "3dl gräddfil eller mjölkfritt alternativ",
            "1st Lime"
        ],
        cookingSteps : [
            "Riv av skalet av limen och blanda ner det i gräddfilen. Ställ såsen i kylen. TIPS! Ju längre såsen får stå med limeskalen i, desto mer lime kommer såsen att smaka.",
            "Tärna mangon i centimeterstora bitar. Skiva chilin tunnt. Blanda ihop och låt götta sig en stund. Även Salsan mår ra av att stå i någon timme innan servering, men smakar fint även om den serveras direkt.",
            "Tillaga Torsken efter beskrivningen på paketet.",
            "Skiva torsken på hälften på längden. Ta fram ett tortilla-bröd. Lägg en eller två torskbitar på brödet. Häll på mangosalsa och klicka sedan på några klickar limesås.",
            "Vik din tortilla. Tadaaa~! Redo att avnjutas"
        ],
        mdsaCategories : [
            "taco",
            "fisk",
            "fredagsmys",
            "moffafredag"
        ],
        author : "Hjortronbåt",
        isShared : false
    }

    //Transform for easier follow on where the different items are showing and are styled.
    const {
        title,
        preambleHTML,
        imageURL,
        portions,
        cookingTime,
        cookingSteps,
        difficulty,
        ingredients,
        mdsaCategories,
        author,
        // eslint-disable-next-line no-unused-vars
        isShared
    } = recipe; 

    return(
        <Wrapper>
            {isLoading? <p>is Loading</p>
            : 
            <RecipeWrapper>
                <FlexRow>
                    {isSessionUsersRecipe?
                        <>
                            <StarIcon 
                                $isStarred = {isStarred} 
                                icon={isStarred? roundStarRate : roundStarOutline} 
                                onClick = {() => setIsStarred(!isStarred)}
                            />
                            <HeadlineSmall> {isStarred? 'SPARAD I DIN RECEPTBOK':'SPARA I DIN RECEPTBOK'}</HeadlineSmall>
                        </>
                        :
                        <SpaceBetweenWrapper>  
                            <FlexRow $style = {{margin: 0}}>
                            <SharedIcon 
                                $isSharedRecipe = {isSharedRecipe} 
                                icon={isSharedRecipe ? roundRadioButtonChecked : roundRadioButtonUnchecked} 
                                onClick = {() => setIsShared(!isSharedRecipe)}
                            />
                            <HeadlineSmall> {isSharedRecipe? 'DELAD MED DINA VÄNNER':'FÄRDIG? DELA MED DINA VÄNNER'}</HeadlineSmall>
                            </FlexRow>
                            {user.username === author && <EditIcon 
                                icon = {bxEdit}
                                onClick = {() => setIsEdit(true)}
                            />}
                        </SpaceBetweenWrapper>           
                    }
                </FlexRow>
                <PartingStrip width = '100%'/>
                <TopSection 
                    title = {title} 
                    description = {preambleHTML} 
                    image = {imageURL} 
                    difficulty = {difficulty} 
                    cookingTime = {cookingTime}
                />
                <PartingStrip width = '100%'/>
                <IngredientSection portions = {portions} ingredients = {ingredients}/>
                <PartingStrip width = "200px" />
                <CookingStepsSection cookingSteps = {cookingSteps}/>
                <PartingStrip width = "100%" />
                <BottomSection categories = {mdsaCategories} author = {author}/>
            </RecipeWrapper>
}
        </Wrapper>
    );
};

export default RecipeView;