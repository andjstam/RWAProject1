
export class Pesma{

    id:number;
    naziv:string;
    izvodjac:string;
    tekst:string;

    constructor(id:number,naziv:string,izvodjac:string,tekst:string){
        if(id==undefined)
            this.id=-1;
        else this.id=id;
        this.naziv=naziv;
        this.izvodjac=izvodjac;
        this.tekst=tekst;
    }

    getId(){
        return this.id;
    }

    getNaziv(){
        return this.naziv;
    }
    
    getIzvodjaca(){
        return this.izvodjac;
    }

    getTekst(){
        return this.tekst;
    }
}