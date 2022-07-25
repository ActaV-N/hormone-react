import styled from "@emotion/styled"
import classNames from "classnames"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { ReactNode, useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger);

const StyledInfo = styled.div`
    width:70%;
    margin:0 auto;

    .info-head{
        text-transform:uppercase;
        font-size: 3.5vw;
        font-weight:500;
        letter-spacing:-0.03em;

        color:#1e1e1e;
    }

    .info-image{
        margin-top:35px;

        width:100%;
        .visual-wrap{
            width:100%;

            aspect-ratio:1.8;
            img{
                width:100%;
                height:100%;
                max-height:100vh;
                
                object-fit:cover;
                object-position:0 100%;
            }
        }
    }

    .info-grid--container{
        display:grid;
        grid-template-columns:repeat(auto-fit, minmax(630px, 1fr));

        column-gap:30px;
        row-gap:50px;

        margin-top:30px;

        .info-grid--item{
            .info-item--title{
                font-size:26px;
                font-weight:500;
                margin-bottom:15px;
            }
    
            .info-item--body{
                letter-spacing:0.05em;
                line-height:1.5;
    
                margin-top:10px;
                font-size:22px;
            }
        }

    }
`

type BasicPropsType = {
    children?: ReactNode,
    className?: string
}

const Info = ({children, ...restProps}: BasicPropsType) => {
    const infoRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const image = infoRef.current?.querySelector('.info-image img') as Element;

        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:image,
                start:'top 80%',
                end:'bottom top',
                scrub:3,
            }
        }).addLabel('start');

        tl.to(image, {
            objectPosition:'0 calc(100% + 100px)',
            ease:'power1.inOut'
        })
    }, [])

    return <StyledInfo {...restProps} ref={infoRef}>
        {children}
    </StyledInfo>
}


Info.Head = ({children, className, ...restProps}: BasicPropsType) => {
    return <div className={classNames(className, 'info-head')} {...restProps}>
        {children}
    </div>
}

type ImageProps = BasicPropsType & {
    src:string,
    alt:string,
    small?:boolean
}

Info.Image = ({src, alt, className, small=false, ...restProps}: ImageProps) => {
    return <div className={classNames(className, 'info-image', small && 'small')} {...restProps}>
        <div className="visual-wrap">
            <img src={src} alt={alt} />
        </div>
    </div>
}

Info.GridContainer = ({children, className, ...restProps}: BasicPropsType) => {
    return <div className={classNames(className, "info-grid--container")} {...restProps}>
        {children}
    </div>
}

Info.GridItem = ({children, className, ...restProps}: BasicPropsType) => {
    return <div className={classNames(className, 'info-grid--item')} {...restProps}>
        {children}
    </div>
}

Info.GridItemTitle = ({children, className, ...restProps}: BasicPropsType) => {
    return <div className={classNames(className, 'info-item--title')} {...restProps}>
        {children}
    </div>
}

Info.GridItemBody = ({children, className, ...restProps}: BasicPropsType) => {
    return <div className={classNames(className, 'info-item--body')} {...restProps}>
        {children}
    </div>
}

export default Info