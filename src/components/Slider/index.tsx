import styled from '@emotion/styled';
import classNames from 'classnames';
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
    transform:translateY(calc(-50% - ${Image.HEIGHT / 2}px)) rotate(15deg) translateX(${Image.WIDTH / 2 - 512}px);

    will-change:transform;

    display:flex;

    padding-left:500px;
    box-sizing:content-box;

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
    transform-origin:top left;

    &:nth-last-of-type(1){
        margin:0;
    }

    &:nth-of-type(2n){
        transform:translate(${-60 * Math.cos(Math.PI / 360 * 65)}px, ${60 * Math.sin(Math.PI / 360 * 65)}px);
    }

    &:nth-of-type(2n + 1){
        transform:translate(${-60 * Math.cos(Math.PI / 360 * 65)}px, ${-60 * Math.sin(Math.PI / 360 * 65)}px);
    }

    a{
        text-decoration:none;
        color:#fff;

        display:flex;
        align-items:center;
        justify-content:center;

        width:100%;
        height:100%;


        .item-container{
            opacity:0;

            transition:opacity 0.2s cubic-bezier(0.37, 0, 0.63, 1);

            &.animating{
                opacity:0 !important;
            }
        }
        
        &:hover{
            .item-container{
                opacity:1;
                transition:opacity 0.3s cubic-bezier(0.37, 0, 0.63, 1);
            }
        }
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
        const slider = sliderRef.current
        if(slider){
            const maxScroll = slider.scrollWidth - slider.offsetWidth;

            if(scrollValue < 0){
                gsap.set(slider, {
                    transform:`translateY(calc(-50% - ${Image.HEIGHT / 2}px)) rotate(15deg) translateX(${Image.WIDTH / 2 - 512 - scrollValue}px)`
                })
            } else if(scrollValue > maxScroll){
                gsap.set(slider, {
                    transform:`translateY(calc(-50% - ${Image.HEIGHT / 2}px)) rotate(15deg) translateX(${Image.WIDTH / 2 - 512 - (scrollValue - maxScroll)}px)`
                })
            }
            else{
                gsap.set(slider, {
                    transform:`translateY(calc(-50% - ${Image.HEIGHT / 2}px)) rotate(15deg) translateX(${Image.WIDTH / 2 - 512}px)`
                })
                slider.scrollTo(scrollValue, 0);
            }
        }
    }, [scrollValue])

    const handlePageMove = (e:any) => {
        const to = e.currentTarget.dataset.to;
        
        if(!isAnimating){
            navigate(to);
        }
    }

    return <SliderContainer ref={sliderRef}>
        {Object.values(titleConfigures).map((hormone, i) => <SlideItem key={i}>
            <CustomLink onClick={handlePageMove} data-to={`/${hormone.text.toLowerCase()}`}>
                <div className={classNames('item-container', isAnimating && 'animating')}>
                    <h1>{hormone.text}</h1>
                </div>
            </CustomLink>
        </SlideItem>)}
    </SliderContainer>
}

export default Slider;