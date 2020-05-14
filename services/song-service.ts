import {urlConst} from '../constants/url-constants';
import {from} from 'rxjs';

const url=urlConst.URL;

export class SongService{
    constructor(){
    }
    
    getAllSongs(){
        return from(
            fetch(`${url}/pesme`)
            .then(res => {return res.json()})
        )
    }

    getSongById(id:number){
        return from(
            fetch(`${url}/pesme/`+id)
            .then(res => {return res.json()})
        )
    }
    
    getSongBySingerName(izvodjac:string){
        return from(
            fetch(`${url}/pesme?izvodjac=${izvodjac}`)
            .then(res => {return res.json() })
        )
    }

    getSongByName(name:string){
        return from(
            fetch(`${url}/pesme?naziv=${name}`)
            .then(res => {return res.json() })
        )
    }

    getSongBySearchedValue(tekst:string){
        return from(
            fetch(`${url}/pesme?q=${tekst}`)
            .then(res =>  {return res.json() })
        )
    }
}