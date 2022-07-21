import styled from "@emotion/styled";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { titleConfigures } from "../sketch/configure";

const HormoneContainer = styled.div`
    margin-top:100vh;
    min-height:100vh;

    background:#f0f0f0;

    border-radius: 30px 30px 0 0;

    padding: 120px 35px 35px;

    position:relative;

    .scroll-text{
        text-transform:uppercase;
        mix-blend-mode:difference;
        color:#fff;
        font-size:22px;

        position:fixed;
        bottom: 50px;
        left:50%;

        opacity:0;
        visibility:hidden;

        z-index:-1;

        transform:translate(-50%, 0);
    }
`

const Hormones = () => {
    const params = useParams()
    const hormoneName = params.hormoneName as string;

    const hormoneContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(hormoneName){
            const tl = gsap.timeline({
                delay:1
            }).addLabel('start')

            const scrollText = hormoneContainerRef.current?.querySelector('.scroll-text') as Element;
            tl.to(scrollText, {
                autoAlpha:1,
                ease:'power1.inOut',
                duration:0.5
            }, 'start')
        }
    }, [hormoneName])

    return <HormoneContainer ref={hormoneContainerRef}>
        {hormoneName && <div className="scroll-text">(Scroll)</div>}
        {titleConfigures[hormoneName].component}
    </HormoneContainer>
}

export default Hormones;