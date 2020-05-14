
export class Gost{

    constructor(id,tableObs){
        this.id=id;
        this.zauzet=false;
        this._tableObserver=tableObs;
    }

    cancelSubscription()
    {
        this._tableObserver.unsubscribe();
    }

    changeAvailability(dailine){
        this.zauzet=dailine;
    }
}