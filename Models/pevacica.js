import {Narudzbina} from './narudzbina'

export class Pevacica{

    constructor(){
        this.narucenePesme=new Array;
    }

    addSong(song){
        this.narucenePesme.push(song);
    }

    singASong(){
        return this.narucenePesme.shift();
    }

    sortMostExpensive(){

    }
}