import { styled } from 'styletron-react';
import THEME from '../config/theme';

//This is a wrapper for contentwrapper with side-menu;

const ContentWrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '240px auto',
    gridTemplateRows: 'auto',
    width: '100%',
    height: '100%',
    backgroundColor: THEME.colors.white[0]
});

const GridContentWrapper = ({children}) => (
    <ContentWrapper>
        {children}
    </ContentWrapper>
);

export default GridContentWrapper;