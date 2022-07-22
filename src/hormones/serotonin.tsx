import styled from '@emotion/styled'
import React from 'react'
import Info from '../components/HormoneInfo/Info'

const SerotoninContainer = styled.div`

`

const Serotonin = () => {
    return <SerotoninContainer>
        <Info>
            <Info.Head>The happy hormone</Info.Head>
            <Info.Image src='images/serotonin/serotonin-1.jpg' alt='serotonin' small />
            <Info.GridContainer>
                <Info.GridItem>
                    <Info.GridItemTitle>Emotion, Appetite, Sleep</Info.GridItemTitle>
                    <Info.GridItemBody>
                        Serotonin secretion makes your feeling, appetite high, and also make you sleep well(This also scientific reason!👨🏻‍🔬).
                        If you can secrete this serotonin well, you could get healthy life style!.
                        So if you have in trouble some kinda torpor, read this article so that you can screte serotonin by natural way.
                    </Info.GridItemBody>
                    <Info.GridItemBody>
                        🌞 If you get the wonderful sun light when you wake up, you could feel more fresh feeling. So if you can, you should open your curtain!
                    </Info.GridItemBody>
                </Info.GridItem>
                <Info.GridItem>
                    <Info.GridItemTitle>The happy hormone, serotonin</Info.GridItemTitle>
                    <Info.GridItemBody>
                        Because serotonin makes us sleep and eat well, we can naturally feel the happiness in serotonin life style.😊
                        
                    </Info.GridItemBody>
                    <Info.GridItemBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sit dolore quia? Asperiores harum reiciendis nihil magni repellendus atque ipsam quia aperiam aliquam? Ipsam, maxime.
                    </Info.GridItemBody>
                </Info.GridItem>
            </Info.GridContainer>
        </Info>
    </SerotoninContainer>
}

export default Serotonin