import { styled } from 'styletron-react';
import THEME from '../../config/theme';
import media from '../../config/media';
//default image
import defaultImage from '../../assets/images/defaultImg2.png';

const TopGridWrapper = styled('div', {
    display: 'grid',
    //gridTemplateColumns: '100%',
    gridTemplateRows: '50px 300px auto auto',
    columnGap: '2rem',
    width: '100%',
    margin: '2rem 0',

    "@media screen and (min-width: 700px)": {
        gridTemplateColumns: 'auto 300px',
        gridTemplateRows: '50px 250px 80px',
        columnGap: '2rem',
        margin: '4rem 0',
    },
    [media.above.tablet] : {
        width: '100%',
        gridTemplateColumns: 'auto 330px',
       // gridTemplateRows: '50px 170px 40px',
    },
    //EDGECASE
    "@media screen and (min-width: 930px)": {
        gridTemplateRows: '50px 250px 80px',
        gridTemplateColumns: 'auto 350px',
    },
    [media.above.laptop] : {
        gridTemplateColumns: 'auto 400px',
        gridTemplateRows: '50px 170px 40px',
        width: '1000px',
    }
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

const FlexRowResponsive = styled('div', {
    display: 'flex',
    gridColumn: '1/2',
    gridRow: '4/5',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    height: '80px',
    margin: '1rem 0 0 0',

    "@media screen and (min-width: 700px)": {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gridColumn: '1/3',
        gridRow: '3/4',
    },
    [media.above.tablet] : {
        width: '550px',
    },

    [media.above.laptop] : {
        gridRow: '3/4',
        gridColumn: '1/2',
    },

});

const Title = styled('h2', {
    gridColumn: '1/2',
    gridRow: '1/2',
    fontSize: THEME.fontSizes.large,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 700,
    letterSpacing: '0.05rem',
    "@media screen and (min-width: 700px)": {
        gridColumn: '1/2',
        gridRow: '1/2',
        fontSize: THEME.fontSizes.smallHeader,
    },
});

const HeadlineSmall = styled ('h4', {
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontSize: THEME.fontSizes.Xsmall,
    fontWeight: 700,
    letterSpacing: '0.05rem',
    "@media screen and (min-width: 700px)": {
        gridColumn: '1/2',
        gridRow: '1/2',
        fontSize: THEME.fontSizes.small,
    },
});

const Text = styled('p', {
    gridColumn: '1/2',
    gridRow: '3/4',
    margin: '1rem 0',
    fontSize: THEME.fontSizes.Xsmall,
    fontFamily: THEME.fonts.text,
    color: THEME.colors.black[0],
    fontWeight: 500,
    lineHeight: '167%',
    letterSpacing: '0.05rem',
    "@media screen and (min-width: 700px)": {
        gridColumn: '1/2',
        gridRow: '2/3',
        margin: 0,
        fontSize: THEME.fontSizes.small,
    },
});

const Image = styled('div',({$image}) => ({
    gridColumn: '1/2',
    gridRow: '2/3',
    width: '100%',
    height: '300px',
    backgroundImage: $image? `url(${$image})` : `url(${defaultImage})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',

    "@media screen and (min-width: 700px)": {
        gridColumn: '2/3',
        gridRow: '1/3',
        width: '100%',
    },
    [media.above.laptop] : {
        gridRow: '1/4',
    },
}));

const EffortBox = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '30px',
    marginLeft: '1rem',
    backgroundColor: THEME.colors.secondary[0],
    border: `1px solid ${THEME.colors.black[0]}`,
    textTransform: 'uppercase'
});

const TopSection = ({title, description, image, difficulty, cookingTime}) => (
    <TopGridWrapper>
        <Title>{title}</Title>
        <Image $image = {image}/>
        <Text>{description}</Text>
        <FlexRowResponsive>
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
        </FlexRowResponsive>
    </TopGridWrapper>
);

export default TopSection;