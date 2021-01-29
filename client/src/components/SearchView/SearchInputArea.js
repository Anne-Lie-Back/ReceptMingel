import { styled } from 'styletron-react';
import InputField from '../inputField';
import THEME from '../../config/theme';
import media from '../../config/media';

const Wrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '2rem 1rem 2rem 1rem',
    backgroundColor: THEME.colors.primary[0],
    borderRadius: 0,
    boxShadow: '0 0 2px black',

    [media.above.XSmobile] : {
        padding: '2rem 3rem 2rem 3rem',
    },
    [media.above.tablet] : {
        padding: '3rem 4rem 3rem 4rem',
       width: 'auto',
       borderRadius: '5px',
    }
});

const AlignWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: '275px',

    [media.above.mobile] : {
        maxWidth: '375px',
    }
});

const FlexRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
});

const Label = styled('label', {
    marginBottom: '0.5rem',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    color: THEME.colors.white[0]
});

const SearchInputField = styled(InputField, {
    width: '200px',

    [media.above.mobile] : {
        width: '250px',
    },
    [media.above.mobile] : {
        width: '300px',
    }
});

const Button = styled('button', {
    width: '75px',
    padding: '0.55rem',
    backgroundColor: THEME.colors.contrast[0],
    border: 'none',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    boxShadow: '0 0 2px black',
    fontFamily: THEME.fonts.text,
    fontSize: THEME.fontSizes.normal,
    fontWeight: 700,
    textAlign: 'center',
    color: THEME.colors.white[0],
    letterSpacing: '0.05rem',
    outline:'none',

    ':hover': {
        cursor:'pointer',
        backgroundColor: THEME.colors.black[0]
    }
});

const SearchInputArea = ({setSearchInput, handleClick}) => (
    <Wrapper>
        <AlignWrapper>
            <Label htmlFor = "search">Vad vill du äta idag?</Label>
            <FlexRow>
                <SearchInputField 
                    type = "text"
                    name = "search"
                    styling = "basic"
                    handleChange = {(event) => {setSearchInput(event.target.value)}}
                />
                {/* Disabled until I can get a better search up and running */}
               {/*  <Button onClick = {handleClick}> Sök </Button>  */}
            </FlexRow>
        </AlignWrapper>
    </Wrapper>
);

export default SearchInputArea;