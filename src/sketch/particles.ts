import gsap from 'gsap';
import P5 from 'p5';
import { particleCount, particles, tps } from '.';

const DELAY_ACC = 0.0001;

export default class Particle{
    private x:number; 
    private y:number; 
    private initX:number; 
    private initY:number; 
    private radius:number;
    private initRadius:number;
    private vx: number;
    private vy: number;
    private toText:boolean = false;

    constructor(
        private index: number,
        private p5:P5,
    ){
        this.x = Math.random() * this.p5.windowWidth;
        this.y = Math.random() * this.p5.windowHeight;

        this.initX = this.x;
        this.initY = this.y;

        this.vx =  Math.random() * 2 - 1;
        this.vy =  Math.random() * 2 - 1;

        const radius = Math.random() * 2 + 1;
        this.radius = 0

        gsap.to(this, {
            radius: radius,
            ease:'power1.inOut',
            duration:0.3,
        })

        this.initRadius = radius;
    }

    ramble(){
        if(this.toText){
            this.toText = false;

            const easeList = [
                'back.out(1)',
                'power2.inOut',
                'power2.out',
                'circ.out',
                'expo.out',
            ];

            const tl = gsap.timeline({
                delay:this.index * 0.0001
            }).addLabel('start');

            tl.to(this, {
                x:this.initX,
                y:this.initY,
                duration:1,
                ease:easeList[Math.round(Math.random() * easeList.length)],
            }, 'start').addLabel('end', '>')

            tl.to(this, {
                radius:this.initRadius,
                ease:'power1.inOut',
                duration:0.4
            }, 'start')

            if(this.index >= tps.length && this.index >= particleCount){
                tl.to(this, {
                    radius:0,
                }, 'end')
            }
        }

        this.x += this.vx;
        if(this.x > this.p5.windowWidth || this.x < 0){
            this.vx *= -1;
        }
        this.y += this.vy;
        if(this.y > this.p5.windowHeight || this.y < 0){
            this.vy *= -1;
        }
    }

    ash(){
        if(this.index % 2 === 0){
            this.x = this.x + this.p5.cos(this.p5.millis() * (0.08 / (this.index + 1) % 10)) * 2;
        } else{
            this.x = this.x + this.p5.sin(this.p5.millis() * (0.08 / (this.index + 1) % 10)) * 2;
        }

        if(this.x < 0){
            this.x = this.p5.windowWidth + this.radius * 2;
        } else if(this.x > this.p5.windowWidth){
            this.x = - this.radius * 2;
        }

        this.y -= this.p5.abs(this.vy) * 10;
        if(this.y < 0){
            this.y = this.p5.windowHeight + this.radius * 2;
        }
    }

    die(index: number){
        const tl = gsap.timeline().addLabel('start');

        tl.to(this, {
            radius:0,
            ease:'power1.inOut',
            duration:0.3,
            onComplete(){
                particles.splice(index, 1);
            }
        }, 'start');
    }

    text(to:{x:number, y:number}){
        if(!this.toText){
            this.toText = true;
            
            const easeList = [
                'back.out(1)',
                'power2.inOut',
                'power2.out',
                'circ.out',
                'expo.out',
            ];

            const tl = gsap.timeline({
                delay:DELAY_ACC * this.index
            }).addLabel('start');

            if(to && to.x && to.y){
                tl.to(this, {
                    x:to.x,
                    y:to.y,
                    ease:easeList[Math.round(Math.random() * easeList.length)],
                    duration:1.2
                }, 'start')
            }

            tl.to(this, {
                radius: 4,
                ease:'power1.inOut',
                duration:1
            }, 'start+=.2');
        }
    } 

    draw(isText: boolean, color:string){
        if(!isText){
            this.p5.fill(205);
            this.ramble();
        } else{
            this.p5.fill(color);
        }
        this.p5.noStroke();
        this.p5.circle(this.x as number , this.y as number, this.radius as number);
    }
}