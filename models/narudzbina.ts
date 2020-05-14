
export class Narudzbina{

    gost:number;
    pesma:number;
    novac:number;

    constructor(gostID:number,pesmaID:number,novac:number){
        this.gost=gostID;
        this.pesma=pesmaID;
        this.novac=novac;
    }

    getGostId(){
        return this.gost;
    }

    getPesmaId(){
        return this.pesma;
    }

    getNovacID(){
        return this.novac;
    }
}