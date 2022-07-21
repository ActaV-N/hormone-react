import styled from "@emotion/styled"
import classNames from "classnames"
import { ReactNode } from "react"

const StyledInfo = styled.div`
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

            img{
                width:calc(100% + 70px);
                height:100%;
                max-height:100vh;
                object-fit:cover;

                transform:translate(-35px, 0);
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

Info.GridContent = () => {

}

Info.GridItem = () => {
    
}

export default Info