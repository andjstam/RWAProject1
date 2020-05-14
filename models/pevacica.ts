import {Narudzbina} from './narudzbina'

export class Pevacica{
    
    narucenePesme:Array<Narudzbina>;

    constructor(){
        this.narucenePesme=new Array<Narudzbina>();
    }
    
    addSong(song:Narudzbina){
        this.narucenePesme.push(song);
    }

    singASong(){
        return this.narucenePesme.shift();
    }

}