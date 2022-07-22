import { ReactNode } from "react";
import Dopamin from "../hormones/dopamin";
import Endorphin from "../hormones/endorphin";
import Melatonin from "../hormones/melatonin";
import Serotonin from "../hormones/serotonin";

export type titleConfType = {
    text:string,
    size:number,
    x:string,
    y:string,
    image:string,
    pColor?:string,
    bColor?:string,
    component?:ReactNode
}

type titleConfiguresType = {
    [index: string]: titleConfType
}

export const titleConfigures:titleConfiguresType = {
    serotonin:{
        text:'SEROTONIN',
        size:120,
        x: 'center',
        y:'center',
        image:'/images/serotonin.jpg',
        pColor:'#000',
        bColor:'#ffc078',
        component: <Serotonin/>
    },
    melatonin:{
        text:'MELATONIN',
        size:120,
        x: 'center',
        y:'center',
        image:'/images/melatonin.jpg',
        pColor:'#ffdd99',
        bColor:'#322244',
        component: <Melatonin/>
    },
    dophamin:{
        text:'DOPHAMIN',
        size:120,
        x: 'center',
        y:'center',
        image:'/images/dophamin.jpg',
        pColor:'#fff',
        bColor:'#ee7073',
        component:<Dopamin/>
    },
    endorphin:{
        text:'ENDORPHIN',
        size:120,
        x: 'center',
        y:'center',
        image:'/images/endorphin.jpg',
        pColor:'#d5fb45',
        bColor:'#000000',
        component:<Endorphin/>
    },
    adrenaline:{
        text:'ADRENALINE',
        size:120,
        x: 'center',
        y:'center',
        image:'/images/adrenaline.jpg',
        pColor:'#001A2D',
        bColor:'#B690FF'
    },
    noradrenaline:{
        text:'NORADRENALINE',
        size:120,
        x: 'center',
        y:'center',
        image:'/images/noradrenaline.jpg',
        pColor:'#9c1303',
        bColor:'#000000'
    },
    acetylcholine:{
        text:'ACETYLCHOLINE',
        size:120,
        x: 'center',
        y:'center',
        image:'/images/acetylcholine.jpg',
        pColor:'#546883',
        bColor:'#C0CAD7'
    },
}