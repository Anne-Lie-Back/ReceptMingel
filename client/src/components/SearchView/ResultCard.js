import { styled } from 'styletron-react';
//import THEME from '../../config/theme';
import PartingStrip from '../PartingStrip';
import owlTest from '../../assets/images/owlTest.jpg'
import THEME from '../../config/theme';

const Wrapper = styled('div', {
    width: '100%',
    maxWidth: '800px',
    margin: '1rem 0',
})

const ContentWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    margin: '1rem 0'
});

const TextWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1rem',
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0]
});

const Title = styled('h3', {
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700
})

const Text = styled('p', {
    fontSize: THEME.fontSizes.Xsmall
});

const Image = styled('div',({$image}) => ({
    
    width: '248px',
    height: '135px',
    backgroundImage: $image? `url(${$image})` : `url(${owlTest})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
    borderRadius: '5px'
}));

const ResultCard = () => {

    //TODO remove all this and make it only return JSX
    const recipe = {
        title : "Exotiska Tacos",
        preambleHTML : "En fräsch taco med panerad tofu. Den sötstarka mangosalsan ger mycket fraschör. Var inte rädd för att dunka på en del med chilin, mangon och limedressingen tar ut en del styrka. Detta är en perfekt sommar-rätt! ",
        image : owlTest,
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

    const {
        title,
        preambleHTML,
        //image,
        cookingTime,
        difficulty,
        //ingredients,
        mdsaCategories,
        // eslint-disable-next-line no-unused-vars
        isShared
    } = recipe;

    return(
        <Wrapper>
            {/* TODO: remove this partingStrip */}
            <PartingStrip width = "100%"/>

            <ContentWrapper>
                <Image/>
                <TextWrapper>
                    <Title>
                        {title}
                    </Title>
                    <Text>
                        {preambleHTML}
                    </Text>
                </TextWrapper>
            </ContentWrapper>
            
            <PartingStrip width = "100%"/>
        </Wrapper>
    );
};

export default ResultCard;