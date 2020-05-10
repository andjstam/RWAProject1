
export class Gosti{

    constructor(){
        this.brojGostiju=6;
        this.niz=new Array;
    }

    areThereAvailableTables(){
        if(this.niz.length===this.brojGostiju)
            return false;
        return true;
    }

    addEl(idGosta){
        this.niz.push(idGosta);
    }

    deleteEl(){ //uklanja sa pocetka niza
        return this.niz.shift();
    }

}
