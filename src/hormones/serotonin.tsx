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
        </Info>
    </SerotoninContainer>
}

export default Serotonin