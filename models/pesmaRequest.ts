export interface IPesmaRequest{
    naziv:string;
    izvodjac:string;
    tekst:string;
}

export class PesmaRequest implements IPesmaRequest{
    naziv: string;
    izvodjac: string;
    tekst: string;

    constructor(naziv: string, izvodjac: string, tekst: string){
        this.naziv=naziv;
        this.izvodjac=izvodjac;
        this.tekst=tekst;
    }
}