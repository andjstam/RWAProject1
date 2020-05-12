import {urlConst} from '../constants/url-constants.js';
import {from} from 'rxjs';
import {take,flatMap} from 'rxjs/operators'

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

    getSongById(id){
        return from(
            fetch(`${url}/pesme/`+id)
            .then(res => {return res.json()})
        )
    }
    
    getSongBySingerName(izvodjac){
        return from(
            fetch(`${url}/pesme?izvodjac=${izvodjac}`)
            .then(res => {return res.json() })
        )
    }

    getSongByName(name){
        return from(
            fetch(`${url}/pesme?naziv=${name}`)
            .then(res => {return res.json() })
        )
    }

    getSongBySearchedValue(tekst){
        return from(
            fetch(`${url}/pesme?q=${tekst}`)
            .then(res =>  {return res.json() })
        )
    }
}