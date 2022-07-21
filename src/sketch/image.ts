import gsap from "gsap";
import P5 from "p5";
import { totalScroll, wheelDelta } from ".";
import { titleConfType } from "./configure";

export default class Image{
    public static WIDTH: number = 600;
    public static HEIGHT: number = 800;

    public screenState:boolean = true;

    public isDead:boolean = false;
    private isDying:boolean = false;

    private width:number = 600;
    private height:number = 800;

    private x:number=0;
    private scrollX: number = 0;
    private y:number;

    private maskHeight:number = 800;

    private sourceInfo:{
        x:number,
        y:number,
        w:number,
        h:number
    } = {
        x:0, y:0, w:0, h:0
    }

    constructor(private img: P5.Image, public index: number, private p5:P5, private conf: titleConfType){
        this.x = this.index * (this.width + 100);
        this.scrollX = this.x - totalScroll;
        this.y = (p5.windowHeight - this.height) / 2;
    }

    init(){
        this.width = Image.WIDTH;
        this.height = Image.HEIGHT;
        
        this.isDying = false;
        
        const d_ratio = this.height / this.width;
        const s_ratio = this.img.height / this.img.width;

        let s_width = this.img.width,
            s_height = this.img.height;
        
        if(s_ratio > 1){
            s_height = s_width * d_ratio;
        } else{
            s_width = s_height / d_ratio;
        }

        const sy = (this.img.height - s_height) / 2;

        const gap = 150

        this.sourceInfo = {
            x:gap / 2,
            y:sy + gap / 2,
            w:s_width - gap,
            h:s_height - gap
        }

        this.maskHeight = this.height;
        
        const tl = gsap.timeline().addLabel('start');
        tl
        .to(this, {
            maskHeight:0,
            ease:'circ.out',
            duration:0.8,
        }, 'start')

        tl.to(this.sourceInfo, {
            x: 0,
            y: sy,
            w:s_width,
            h:s_height,
            ease:'circ.out',
            duration:1.2
        }, 'start')

        this.checkScreenState();
    }

    checkScreenState(){
        if((this.scrollX - 100 > this.p5.windowWidth) ||
        (this.scrollX + this.width < 0)){
            this.screenState = false;
        } else{
            this.screenState = true;
        }
    }

    updateIndex(index: number){
        this.index = index;
        this.x = this.index * (this.width + 100);
    }

    mask(){
        this.p5.fill('#1e1e1e');
        this.p5.noStroke();
        this.p5.rect(this.scrollX, this.y, this.width, this.maskHeight);
    }

    slide(){
        this.scrollX = this.x - totalScroll;

        const ratio = this.scrollX / this.p5.windowWidth;

        this.p5.image(
            this.img,
            this.scrollX,
            this.y,
            this.width,
            this.height,
            this.sourceInfo.x + this.sourceInfo.w * ratio,
            this.sourceInfo.y,
            this.sourceInfo.w,
            this.sourceInfo.h,
        );

        this.p5.fill('rgba(0, 0, 0, 0.4)');
        this.p5.rect(this.scrollX, this.y, this.width, this.height);
    }
    
    die(){
        if(!this.isDying){
            this.isDying = true;

            const tl = gsap.timeline().addLabel('start');

            // tl.to(this,{
            //     maskHeight: this.height,
            //     ease:'power2.in',
            //     duration:0.6,
            // }, 'start')

            tl.to(this,{
                height: -0.01,
                ease:'power2.in',
                duration:0.6,
            }, 'start')

            tl.to(this.sourceInfo,{
                h: 0.01,
                ease:'power2.in',
                duration:0.6,
            }, 'start')

            return tl.totalDuration();
        }
    }

    draw(){
        this.p5.push();
        
        this.p5.translate(0, this.p5.abs(this.index) % 2 === 1 ? 60:-60);

        this.slide();
        this.mask();
        this.p5.pop();
    }
}