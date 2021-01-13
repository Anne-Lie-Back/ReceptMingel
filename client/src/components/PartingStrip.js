import { styled } from 'styletron-react';
import THEME from './../config/theme';

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    //height: 'px',
    margin: '1rem 0 3rem 0',
});

const DecorativeLine = styled('div',({$width}) => ({
    width: $width,
    height: '4px',
    backgroundColor: THEME.colors.secondary[0]
}));

const PartingStrip = ({width}) => (
    <Wrapper>
        <DecorativeLine $width = {width} />
    </Wrapper>
);

export default PartingStrip;