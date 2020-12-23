import React from 'react';
import { styled, withStyleDeep} from 'styletron-react';

const Wrapper = styled('div', {
    width: '400px',
    height: '500px',
    backgroundColor: 'lightblue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const Title = styled('h1', {
    fontFamily: 'arial',
    color: '#fab',
})

const SubTitle = withStyleDeep(Title, {
    color: 'orange',
})

const Test = () => (
    <Wrapper>
        <Title>
            Hellu!
        </Title>
        <SubTitle>Hellu!</SubTitle>
    </Wrapper>
);

export default Test;