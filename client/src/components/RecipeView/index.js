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
});

const HeadlineSmall = styled ('h4', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontSize: THEME.fontSizes.small,
    fontWeight: 500,
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
    columnGap: '1rem',
    width: '800px'
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

const Box1 = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    padding: '0.25rem 0',
    marginLeft: '1rem',
    backgroundColor: THEME.colors.secondary[0],
    border: `1px solid ${THEME.colors.black[0]}`
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

            </RecipeWrapper>
        </Wrapper>
    );
};

export default RecipeView;