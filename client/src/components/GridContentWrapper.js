import {useState, useEffect, useRef} from 'react';
import { styled } from 'styletron-react';
import THEME from '../config/theme';
import useWindowDimensions from '../customHooks/useWindowDimensions';

//This is a wrapper for contentwrapper with side-menu;

const ContentWrapper = styled('div', ({$col2width}) => ({
    display: 'grid',
    gridTemplateColumns: `240px ${$col2width}px`,
    gridTemplateRows: 'auto',
    width: '100%',
    height: '100%',
    //backgroundColor: THEME.colors.white[0]

}));

const GridContentWrapper = ({children}) => {
    const { width } = useWindowDimensions();
    const containerRef = useRef();
    const [column2width, setColumn2width] = useState(width - 240);

    //Checks the containerSize, which is desired maxWidth, and forces objects that would like to expand 
    //outside of grid to stay inside the grid by setting a "hard coded" width for column
    useEffect(() => {
        function handleResize() {
            setColumn2width(containerRef.current.offsetWidth - 240)
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return(
        <ContentWrapper $col2width = {column2width} ref = {containerRef}>
            {children}
        </ContentWrapper>
    );
};

export default GridContentWrapper;