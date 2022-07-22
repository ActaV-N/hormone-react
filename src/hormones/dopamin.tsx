import styled from '@emotion/styled'
import React from 'react'
import Info from '../components/HormoneInfo/Info'

const DopaminContainer = styled.div`

`

const Dopamin = () => {
    return <DopaminContainer>
        <Info>
            <Info.Head>The motivation hormone</Info.Head>
            <Info.Image src='images/dopamin/dopamin-1.jpg' alt='dopamin' small />
            <Info.GridContainer>
                <Info.GridItem>
                    <Info.GridItemTitle>Emotion, Appetite, Sleep</Info.GridItemTitle>
                    <Info.GridItemBody>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio adipisci nobis rerum atque sunt officiis consequuntur labore, quisquam dolore iusto? Quia facere aperiam deleniti nostrum veniam repudiandae mollitia, laborum nisi!
                    </Info.GridItemBody>
                    <Info.GridItemBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, consequatur!
                    </Info.GridItemBody>
                </Info.GridItem>
                <Info.GridItem>
                    <Info.GridItemTitle>The happy hormone, Dopamin</Info.GridItemTitle>
                    <Info.GridItemBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit cum saepe nesciunt mollitia corporis possimus similique vero officiis quisquam? Omnis.
                    </Info.GridItemBody>
                    <Info.GridItemBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sit dolore quia? Asperiores harum reiciendis nihil magni repellendus atque ipsam quia aperiam aliquam? Ipsam, maxime.
                    </Info.GridItemBody>
                </Info.GridItem>
                <Info.GridItem>
                    <Info.GridItemTitle>How to secrete Dopamin</Info.GridItemTitle>
                    <Info.GridItemBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quod ab tempore temporibus rerum laborum praesentium culpa quo porro nemo nesciunt excepturi, at quaerat adipisci commodi vero quidem nam ea fuga sint necessitatibus eveniet. Aspernatur?
                    </Info.GridItemBody>
                </Info.GridItem>
            </Info.GridContainer>
        </Info>
    </DopaminContainer>
}

export default Dopamin