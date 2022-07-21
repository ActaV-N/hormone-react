import styled from "@emotion/styled"
import classNames from "classnames"
import { ReactNode } from "react"

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


            }
        }
    }

    .info-grid--container{
        display:grid;
        grid-template-columns:repeat(auto-fit, minmax(420px, 1fr));

        column-gap:30px;
        row-gap:50px;

        margin-top:30px;

        .info-grid--item{
            .info-item--title{
                font-size:18px;
                font-weight:500;
                margin-bottom:15px;
            }
    
            .info-item--body{
                letter-spacing:0.05em;
                line-height:1.5;
    
                margin-top:10px;
            }
        }

    }
`

type BasicPropsType = {
    children?: ReactNode,
    className?: string
}

const Info = ({children, ...restProps}: BasicPropsType) => {
    return <StyledInfo {...restProps}>
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