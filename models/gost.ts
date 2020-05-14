
export class Gost{
    
    id:string;
    zauzet:boolean;
    _tableObserver:any;
    
    constructor(idStola:string,tableObs:any){
        this.id=idStola;
        this.zauzet=false;
        this._tableObserver=tableObs;
    }

    cancelSubscription()
    {
        this._tableObserver.unsubscribe();
    }

    changeAvailability(dailine:boolean){
        this.zauzet=dailine;
    }

    getIdStola(){
        return this.id;
    }


}