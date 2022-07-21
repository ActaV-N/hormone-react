import styled from "@emotion/styled";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { titleConfigures } from "../sketch/configure";

const HormoneContainer = styled.div`
    margin-top:100vh;
    min-height:100vh;

    background:#f0f0f0;
`

const Hormones = () => {
    const params = useParams()
    const hormoneName = params.hormoneName as string;

    const hormoneContainerRef = useRef(null);

    return <HormoneContainer ref={hormoneContainerRef}>
        {titleConfigures[hormoneName].component}
    </HormoneContainer>
}

export default Hormones;