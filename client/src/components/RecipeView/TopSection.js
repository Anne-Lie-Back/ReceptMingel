import { styled } from 'styletron-react';
import THEME from '../../config/theme';
//TODO change to a default image
import owlTest from '../../assets/images/owlTest.jpg';

const TopGridWrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '450px 330px',
    gridTemplateRows: '50px 170px 40px',
    columnGap: '2rem',
    width: '812px',
    marginBottom: '4rem'
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

const HeadlineSmall = styled ('h4', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontSize: THEME.fontSizes.small,
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

const Image = styled('div',({$image}) => ({
    gridColumn: '2/3',
    gridRow: '1/4',
    width: '100%',
    height: '100%',
    backgroundImage: $image? `url(${$image})` : `url(${owlTest})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
}));

const EffortBox = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '30px',
    marginLeft: '1rem',
    backgroundColor: THEME.colors.secondary[0],
    border: `1px solid ${THEME.colors.black[0]}`,
});

const TopSection = ({title, description, image, difficulty, cookingTime}) => (
    <TopGridWrapper>
            <Title>{title}</Title>
        <Image $image = {image}/>
        <Text>{description}</Text>
        <FlexRow $style = {{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <FlexRow>
                <HeadlineSmall >Svårighetsgrad: </HeadlineSmall>
                <EffortBox>
                    <Text>
                        {difficulty}
                    </Text>
                </EffortBox>
            </FlexRow>
            <FlexRow>
                <HeadlineSmall>Tidsestimering: </HeadlineSmall>
                <EffortBox>
                    <Text>
                        {cookingTime}
                    </Text>
                </EffortBox>
            </FlexRow>
        </FlexRow>
    </TopGridWrapper>
);

export default TopSection;