import {Gost} from './Gost'
export class Gosti{

    brojGostiju:number;
    public niz:Array<Gost>;

    constructor(){
        this.brojGostiju =6;
        this.niz=new Array<Gost>();
    }

    areThereAvailableTables(){
        if(this.niz.length===this.brojGostiju)
            return false;
        return true;
    }

    checkIfAvailable(idStola:string){ 
        let slobodan:boolean=true;
        this.niz.forEach((el:Gost) =>{
            if(el.id===idStola)
                slobodan=false;
        })
        return slobodan;
    }

    addEl(gost:Gost){
        this.niz.push(gost);
    }

    deleteEl(){ 
        return this.niz.shift();
    }
}
