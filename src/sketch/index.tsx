import Sketch from 'react-p5';
import P5 from 'p5';
import { Outlet, useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import roboto from '../fonts/Roboto/Roboto-Regular.ttf';
import Particle from './particles';
import { titleConfigures } from './configure';
import { setXPosition, setYPosition } from '../utils/position';
import Image from './image';
import styled from '@emotion/styled';
import gsap from 'gsap';
import { Observable, Subject } from 'rxjs';

const SketchContainer = styled.div`
    overflow:hidden;

    .canvas-container{
        position:fixed;
        top:0;
        left:0;

        z-index:-1;
    }
`;

export const particleCount = 500;
export const particles:Particle[] = []
export let tps: {
    x: number;
    y: number;
    alpha: number;
}[] = [];

export let wheelDelta = 0;
export let totalScroll = 0;
export let scrollMove = 0;
export let delayedWheel = 0;

export const scrollSubject = new Subject<number>();
export const animationSubject = new Subject<boolean>();

const images: Image[] = []

const DETAIL_TIMEOUT = 700;

const P5sketch = () => {
    const params = useParams()
    const hormoneParam = params.hormoneName as string;
    
    const [hormoneName, setHormoneName] = useState('');

    const prev = useRef('');
    const isTextMode = useRef(false);

    const fontRef = useRef<P5.Font>();

    const colorOptions = useRef({
        pColor:'#fff',
        bColor:'#1e1e1e'
    });
    
    useEffect(() => {
        if(!hormoneParam){
            animationSubject.next(true);
            document.body.classList.add('no-scroll');
            setHormoneName('');
        } else{
            animationSubject.next(true);
            let tid = setTimeout(() => {
                document.body.classList.remove('no-scroll');
                animationSubject.next(false);
            }, DETAIL_TIMEOUT);

            return () => {
                clearTimeout(tid);
            }
        }
    }, [hormoneParam])

    useEffect(() => {
        if(hormoneName){
            const hormone = titleConfigures[hormoneName];
            console.log(hormone)
            gsap.to(colorOptions.current, {
                pColor:hormone.pColor,
                bColor:hormone.bColor,
                duration:0.4,
                ease:'power1.inOut'
            })
        } else{
            gsap.to(colorOptions.current, {
                pColor:'#fff',
                bColor:'#1e1e1e',
                duration:0.4,
                ease:'power1.inOut',
                onComplete(){
                    totalScroll = 0;
                    scrollSubject.next(totalScroll)
                }
            })
        }
    }, [hormoneName])

    const preload = (p5:P5) => {
        fontRef.current = p5.loadFont(roboto);
        images.splice(0, images.length);

        let i=0;
        
        for(const conf of Object.values(titleConfigures)){
            const loadedImage = p5.loadImage(conf.image);
            images.push(new Image(loadedImage, i, p5, conf));
            i++;
        }
    }

    const setup = (p5: P5, canvasParentRef: Element) => {
        console.log('Main setting up')
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        for(let i=0; i<particleCount; i++){
            particles.push(new Particle(i, p5));
        }

        for(let i=0; i<images.length; i++){
            images[i].init();
        }
        animationSubject.next(false);
    }

    let timeoutId: any;
    const draw = (p5:P5) => {
        p5.background(colorOptions.current.bColor);
        delayedWheel = (wheelDelta - delayedWheel) * 0.86;
        scrollMove = (totalScroll - scrollMove) * 0.66;

        if(hormoneName && prev.current !== hormoneName){
            const title = titleConfigures[hormoneName];
            
            const bounds = fontRef.current?.textBounds(title.text, 0, 0, title.size);

            const x = setXPosition(title.x as string, p5, bounds);
            const y = setYPosition(title.y as string, p5, bounds);

            // String particle array generated
            tps = fontRef.current?.textToPoints(title.text, x, y, title.size, {
                sampleFactor: 0.5,
            }) as {
                x: number;
                y: number;
                alpha: number;
            }[];

            isTextMode.current = true;
        } else if(!hormoneName && prev.current !== hormoneName){
            isTextMode.current = false;

            for(let i=particleCount; i<particles.length; i++){
                particles[i].die(i);
            }

            setTimeout(() => {
                for(let i=0; i<images.length; i++){
                    images[i].init();
                }
                
                animationSubject.next(false);
            }, 700);
            
        }

        if(hormoneName){
            for(let i=0; i<tps.length; i++){
                if(!particles[i]){
                    particles.push(new Particle(particles.length + i, p5));
                }
            }
        }

        
        particles.sort(() => Math.random() - 0.5)
        for(let i=0; i<particles.length; i++){
            if(hormoneName){
                particles[i].text(tps[i]);
            }

            particles[i].draw(isTextMode.current, colorOptions.current.pColor);
        }
        
        if(!hormoneName){
            p5.push();
            p5.translate(Image.WIDTH / 2, - Image.HEIGHT / 2)
            p5.angleMode(p5.DEGREES);
            p5.rotate(15);
            
            for(let i=0; i<images.length; i++){
                if(hormoneParam){
                    images[i].die();
                } else{
                    images[i].checkScreenState();
                }
                images[i].draw();
            }

            if(hormoneParam){
                timeoutId = setTimeout(() => {
                    setHormoneName(hormoneParam);
                    clearTimeout(timeoutId);
                }, DETAIL_TIMEOUT)
            }

            p5.pop();
        }

        prev.current = hormoneName;
    }

    const mouseWheel = (e:any) => {
        wheelDelta = (e._mouseWheelDeltaY - wheelDelta) * 0.76 * 0.4
        
        if(wheelDelta < 200) totalScroll += wheelDelta
        else{
            totalScroll += 200;
        }

        scrollSubject.next(totalScroll)

        if(!hormoneName){
            if(wheelDelta < 0){
                const first = images[0];
                if(first.screenState){
                    const prepended = images.splice(-1, 1)[0]
                    prepended.updateIndex(images[0].index - 1);
                    images.unshift(prepended);
                }
        
            } else{
                const last = images.slice(-1)[0];
                
                if(last.screenState){
                    const appended = images.splice(0, 1)[0]
                    appended.updateIndex(images.slice(-1)[0].index + 1);
                    images.push(appended)
                }
            }
        }
    }

    return <SketchContainer>
        <div className='canvas-container'>
            <Sketch setup={setup} draw={draw} preload={preload} mouseWheel={mouseWheel} />
        </div>
        <Outlet/>
    </SketchContainer>
}

export default P5sketch;