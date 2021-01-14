import { styled } from 'styletron-react';
import THEME from './../../config/theme';
import imageTest from '../../assets/images/imageTest.png';
import PartingStrip from '../PartingStrip'

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

const Title = styled('h2', {
    fontSize: THEME.fontSizes.smallHeader,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 700,
    letterSpacing: '0.05rem'
});

const Text = styled('p', {
    fontSize: THEME.fontSizes.small,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 500,
    lineHeight: '167%',
    letterSpacing: '0.05rem'
});

const HeadlineMedium = styled ('h3', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0], 
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700,
    letterSpacing: '0.05rem'
});

const HeadlineSmall = styled ('h4', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontSize: THEME.fontSizes.small,
    fontWeight: 700,
    letterSpacing: '0.05rem'
});


const RecipeWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '812px',
    margin: '1rem 2rem'
});

const TopGridWrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '450px 330px',
    gridTemplateRows: '50px 170px 40px',
    columnGap: '2rem',
    width: '812px',
    marginBottom: '4rem'
});

const Image = styled('div',({$image}) => ({
    gridColumn: '2/3',
    gridRow: '1/4',
    width: '100%',
    height: '100%',
    backgroundImage: $image? `url(${$image})` : `url(${imageTest})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
}));

const Box = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    border: `1px solid ${THEME.colors.black[0]}`
});

const EffortBox = styled(Box, {
    width: '80px',
    marginLeft: '1rem',
    backgroundColor: THEME.colors.secondary[0],
});

const PortionBox = styled(Box, {
    width: '35px',
    marginLeft: '1rem',
    backgroundColor: THEME.colors.white[0],
});

const ListContentWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '3rem 0'
});

const ListItem = styled('li', {
    fontSize: THEME.fontSizes.small,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 500,
    letterSpacing: '0.05rem',
    lineHeight: '167%',
});

const IngredientListItem = styled(ListItem, {
    margin: '1rem 0 0 0.75rem',
    paddingLeft: '1rem'
});

const StepListItem = styled(ListItem, {
    margin: '2rem 0 0 1.65rem', 
    counterIncrement: 'item',

    '::marker' : {
        content: 'counter(item) ".   "',
        paddingRight: '1rem',
        fontFamily: THEME.fonts.text,
        fontWeight: 700,
    },
});

const CategoryContainer = styled(FlexRow, {
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '465px',
    height: '30px',
});

const CategoryBox = styled(Box, {
    width: '120px',
    margin: '0 0.5rem 0.5rem 0',
    padding: '0.5rem 0.5rem',
    backgroundColor: THEME.colors.primary[1],
    //borderRadius: '5px',
    fontSize: THEME.fontSizes.Xsmall,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 500,
    letterSpacing: '0.05rem',
    textTransform: 'uppercase',
});

const RecipeView = () => {
    const recipe = {
        title : "Exotiska Tacos",
        preambleHTML : "En fräsch taco med panerad tofu. Den sötstarka mangosalsan ger mycket fraschör. Var inte rädd för att dunka på en del med chilin, mangon och limedressingen tar ut en del styrka. Detta är en perfekt sommar-rätt! ",
        imageURL : "https://img.koket.se/standard-mega/fisktacos-med-guacamole-och-mangosalsa.jpg.webp",
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
        "cookingSteps" : [
            "Riv av skalet av limen och blanda ner det i gräddfilen. Ställ såsen i kylen. TIPS! Ju längre såsen får stå med limeskalen i, desto mer lime kommer såsen att smaka.",
            "Tärna mangon i centimeterstora bitar. Skiva chilin tunnt. Blanda ihop och låt götta sig en stund. Även Salsan mår ra av att stå i någon timme innan servering, men smakar fint även om den serveras direkt.",
            "Tillaga Torsken efter beskrivningen på paketet.",
            "Skiva torsken på hälften på längden. Ta fram ett tortilla-bröd. Lägg en eller två torskbitar på brödet. Häll på mangosalsa och klicka sedan på några klickar limesås.",
            "Vik din tortilla. Tadaaa~! Redo att avnjutas"
        ],
        "mdsaCategories" : [
            "taco",
            "fisk",
            "fredagsmys",
            "moffafredag"
        ],
        "author" : "Hjortronbåt",
        "isShared" : false
    }

    return(
        <Wrapper>
            <RecipeWrapper>
                <TopGridWrapper>
                    <Title>{recipe.title}</Title>
                    <Image/>
                    <Text>{recipe.preambleHTML}</Text>
                    <FlexRow $style = {{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <FlexRow>
                            <HeadlineSmall >Svårighetsgrad: </HeadlineSmall>
                            <EffortBox>
                                <Text>
                                    {recipe.difficulty}
                                </Text>
                            </EffortBox>
                        </FlexRow>
                        <FlexRow>
                            <HeadlineSmall>Tidsestimering: </HeadlineSmall>
                            <EffortBox>
                                <Text>
                                    {recipe.cookingTime}
                                </Text>
                            </EffortBox>
                        </FlexRow>
                    </FlexRow>
                </TopGridWrapper>
                <PartingStrip width = '100%'/>
                <FlexRow style = {{marginTop: '4rem'}}>
                    <HeadlineSmall>Portioner:</HeadlineSmall>
                    <PortionBox>
                        <Text>
                            {recipe.portions}
                        </Text>
                    </PortionBox>
                </FlexRow>
                <ListContentWrapper>
                    <HeadlineMedium>Ingredienser:</HeadlineMedium>
                    <ul style = {{marginTop: '0.5rem'}}>
                        {recipe.ingredients.map(item => (
                            <IngredientListItem>{item}</IngredientListItem>
                        ))}
                    </ul>
                </ListContentWrapper>
                <PartingStrip width = "150px" />
                <ListContentWrapper>
                    <HeadlineMedium>Gör så här:</HeadlineMedium>
                    <ol 
                        style = {{
                            listStyle: 'none',
                            counterReset: 'item',
                            }}>
                        {recipe.cookingSteps.map(item => (
                            <StepListItem>
                                {item}
                            </StepListItem>
                        ))}
                    </ol>
                </ListContentWrapper>
                <PartingStrip width = "100%" />
                <FlexRow $style = {{justifyContent: 'space-between', margin: '4rem 1.5rem 3rem 0'}}>
                    <CategoryContainer>
                            {recipe.mdsaCategories.map(item => (
                              <CategoryBox>{item}</CategoryBox>  
                            ))}
                    </CategoryContainer>
                    <FlexRow>
                    <HeadlineSmall>Författat av:</HeadlineSmall>
                        <Text $style = {{marginLeft: '1rem', lineHeight: '100%'}}>{recipe.author}</Text>
                    </FlexRow>
                </FlexRow>
            </RecipeWrapper>
        </Wrapper>
    );
};

export default RecipeView;