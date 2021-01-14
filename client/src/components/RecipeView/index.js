import { styled } from 'styletron-react';
import THEME from './../../config/theme';
import PartingStrip from '../PartingStrip';
import TopSection from './TopSection';
import IngredientSection from './IngredientSection';
import CookingStepsSection from './CookingStepsSection';
import BottomSection from './BottomSection';
//TODO remove
import imageTest from '../../assets/images/imageTest.png';

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '3rem 0',
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
});

const RecipeWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '812px',
    margin: '1rem 2rem'
});

const RecipeView = () => {

    //TODO remove
    const recipe = {
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
        image,
        portions,
        cookingTime,
        cookingSteps,
        difficulty,
        ingredients,
        mdsaCategories,
        author,
        isShared
    } = recipe;

    return(
        <Wrapper>
            <RecipeWrapper>
                <TopSection 
                    title = {title} 
                    description = {preambleHTML} 
                    image = {image} 
                    difficulty = {difficulty} 
                    cookingTime = {cookingTime}
                />
                <PartingStrip width = '100%'/>
                <IngredientSection portions = {portions} ingredients = {ingredients}/>
                <PartingStrip width = "150px" />
                <CookingStepsSection cookingSteps = {cookingSteps}/>
                <PartingStrip width = "100%" />
                <BottomSection categories = {mdsaCategories} author = {author}/>
            </RecipeWrapper>
        </Wrapper>
    );
};

export default RecipeView;