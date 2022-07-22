import styled from '@emotion/styled';
import classNames from 'classnames';
import React, { ReactNode } from 'react'

const StyledLack = styled.div`
    width:70%;
    margin:0 auto;
`

type BasicPropsType = {
    children?: ReactNode,
    className?: string
}

const Lack = ({children, className, ...restProps}: BasicPropsType) => {
    return <StyledLack className={className} {...restProps}>
        {children}
    </StyledLack>
}

Lack.Symptom = ({className, children, ...restProps}: BasicPropsType) => {
    
    return <div className={classNames('symptom-container', className)} {...restProps}>
        {children}
    </div>
}

Lack.Solution = ({className, children, ...restProps}: BasicPropsType) => {
    return <div className={classNames('solution-container', className)} {...restProps}>
        {children}
    </div>
}

export default Lack;
