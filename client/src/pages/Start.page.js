import RegisterNewUser from '../components/startPage/RegisterNewUser'
import LogInUser from '../components/startPage/LogInUser'
import heroImage from '../assets/images/heroImage.jpg'

import { styled } from 'styletron-react';

const HeroWrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '800px',
    backgroundImage: `url(${heroImage})`,
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
})

const StartPage = () => (
    <HeroWrapper>
        <LogInUser/>
        {/* <RegisterNewUser/> */}
    </HeroWrapper>
)

export default StartPage;