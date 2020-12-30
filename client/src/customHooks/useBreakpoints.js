import { useEffect, useState } from 'react';

//code inspired by https://dev.to/3sanket3/usewindowsize-react-hook-to-handle-responsiveness-in-javascript-3dcl  
// and https://usehooks.com/useWindowSize/
//TODO refactor, better conditional statements and try to remove window resize for useRef instead?

//Checks which breakpoints the screen is in between and returns windowsize
const getBreakPoint = (windowWidth) => {
    if (windowWidth){
        if (windowWidth > 1024) {
            return 'l';
        } else if (windowWidth > 480){
            return 'm';
        } else {
            return 's';
        }
    } else {
        return undefined;
    }
}

const useBreakpoints = () => {
    //Checks if there's actually a window to get a size from
    const isWindowClient = typeof window === 'object';

    const [windowSize, setWindowSize] = useState(
        isWindowClient? getBreakPoint(window.innerWidth): undefined
    )

    //listens after resizes when component is mounted and sets the windowSize on resize and breakpoints.
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getBreakPoint(window.innerWidth));
        }

        if (isWindowClient) {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return windowSize;
}

export default useBreakpoints;