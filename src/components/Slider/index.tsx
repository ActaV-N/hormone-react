import styled from '@emotion/styled';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { animationSubject, scrollSubject, totalScroll } from '../../sketch';
import { titleConfigures } from '../../sketch/configure';
import Image from '../../sketch/image';

gsap.registerPlugin(ScrollToPlugin)

const SliderContainer = styled.div`
    position:fixed;
    top:50%;
    left:0;

    height:${Image.HEIGHT + 120}px;
    width:100vw;

    z-index:2;
    
    transform-origin:top left;
    transform:translate(${Image.WIDTH / 2 - 55}px, calc(-50% - ${Image.HEIGHT / 2}px)) rotate(15deg);

    display:flex;

    overflow-x:hidden;
    overflow-y:hidden;
`

const SlideItem = styled.div`
    flex:1 0 auto;

    cursor:pointer;

    display:flex;
    align-items:center;
    justify-content:center;

    width:600px;
    height:800px;
    
    margin-right:100px;

    &:nth-last-of-type(1){
        margin:0;
    }

    &:nth-of-type(2n){
        transform:translate(0, 120px);
    }

    a{
        text-decoration:none;
        color:#fff;

        display:flex;
        align-items:center;
        justify-content:center;

        width:100%;
        height:100%;

        opacity:0;
        // visibility:hidden;
    }
`;

const CustomLink = styled.a`

`

const Slider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [scrollValue, setScrollValue] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    scrollSubject.subscribe({
        next: v => setScrollValue(v)
    })

    animationSubject.subscribe({
        next: v => setIsAnimating(v)
    })

    useEffect(() => {
        if(sliderRef.current){
            sliderRef.current.scrollTo(scrollValue, 0);
        }
    }, [scrollValue])

    const handlePageMove = (e:any) => {
        const to = e.currentTarget.dataset.to;
        console.log(isAnimating)
        if(!isAnimating){
            navigate(to);
        }
    }

    return <SliderContainer ref={sliderRef}>
        {Object.values(titleConfigures).map((hormone, i) => <SlideItem key={i}>
            <CustomLink onClick={handlePageMove} data-to={`/${hormone.text.toLowerCase()}`}>
                <div className='item-container'>
                    <h1>{hormone.text}</h1>
                </div>
            </CustomLink>
        </SlideItem>)}
    </SliderContainer>
}

export default Slider;