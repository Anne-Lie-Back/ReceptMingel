import { styled } from 'styletron-react';
import THEME from './../../config/theme';
import imageTest from '../../assets/images/imageTest.png';

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '2rem 0',
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
    width: '800px',
    padding: '1rem 2rem'
});

const TopWrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '460px 340px',
    gridTemplateRows: '50px 170px 40px',
    columnGap: '2rem',
    width: '832px'
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

const Box1 = styled(Box, {
    width: '80px',
    marginLeft: '1rem',
    backgroundColor: THEME.colors.secondary[0],
});

const Box2 = styled(Box, {
    width: '35px',
    marginLeft: '1rem',
    backgroundColor: THEME.colors.white[0],
});

const ListContentWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '3rem'
});

const StepListItem = styled('li', {
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

const RecipeView = () => {
    const recipe = {
        title : "Exotiska Tacos",
        preambleHTML : "En fräsch taco med panerad torsk. Den sötstarka mangosalsan ger mycket fraschör. Var inte rädd för att dunka på en del med chilin, mangon och limedressingen tar ut en del styrka. Detta är en perfekt sommar-rätt! ",
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
            "fredagsmys"
        ],
        "author" : "Lee",
        "isShared" : false
    }

    return(
        <Wrapper>
            <RecipeWrapper>
                <TopWrapper>
                    <Title>{recipe.title}</Title>
                    <Image/>
                    <Text>{recipe.preambleHTML}</Text>
                    <FlexRow $style = {{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <FlexRow>
                            <HeadlineSmall >Svårighetsgrad: </HeadlineSmall>
                            <Box1>
                                <Text>
                                    {recipe.difficulty}
                                </Text>
                            </Box1>
                        </FlexRow>
                        <FlexRow>
                            <HeadlineSmall>Tidsestimering: </HeadlineSmall>
                            <Box1>
                                <Text>
                                    {recipe.cookingTime}
                                </Text>
                            </Box1>
                        </FlexRow>
                    </FlexRow>
                </TopWrapper>
                <FlexRow style = {{marginTop: '5rem'}}>
                    <HeadlineSmall>Portioner:</HeadlineSmall>
                    <Box2>
                        <Text>
                            {recipe.portions}
                        </Text>
                    </Box2>
                </FlexRow>
                <ListContentWrapper>
                    <HeadlineMedium>Ingredienser:</HeadlineMedium>
                    <ul style = {{marginTop: '0.5rem'}}>
                        {recipe.ingredients.map(item => (
                            <Text $as = 'li' $style = {{margin: '1rem 0 0 0.75rem'}}>{item}</Text>
                        ))}
                    </ul>
                </ListContentWrapper>
                <ListContentWrapper>
                    <HeadlineMedium>Gör så här:</HeadlineMedium>
                    <ol 
                        style = {{
                            marginTop: '0.5rem', 
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

            </RecipeWrapper>
        </Wrapper>
    );
};

export default RecipeView;