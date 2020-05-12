import {of, fromEvent, Observable } from 'rxjs';
import {debounceTime, switchMap, map} from 'rxjs/operators';
import {SongService} from '../../services/song-service';
import {Narudzbina} from '../../models/narudzbina';
import {Pevacica} from '../../models/pevacica'
import '../../css/main-page.css';

export class MainPage{
    
    constructor(){
        this.body=document.getElementById("main");
        this._service=new SongService();
        this._pevacica=new Pevacica();
        this._tableClickID=0;
    }

    makeElement(el, name, parent)
    {
        let element=document.createElement(el);
        element.className=name;
        parent.appendChild(element);
        return element;
    }

    drawMainView(){ 
         const mainContainer=document.getElementById("main-content");
         mainContainer.className="mainContainer";

         this.drawMainViewGuests(mainContainer);
         this.drawMainViewSinger(mainContainer);
         this.createModal(mainContainer);
         this.createSongSearchEvent();
         this.body.appendChild(mainContainer);
    }

 // #region Guests

    drawMainViewGuests(roditelj){
        //let gostiDiv=this.makeElement("div","gostiDiv",mainContainer);
        let gostiDiv=document.createElement("div");
        gostiDiv.className="gostiDiv";

        let prviRed=this.makeElement("div","prviRed",gostiDiv);
        let prostor=this.makeElement("div","prostor",gostiDiv);
        let drugiRed=this.makeElement("div","drugiRed",gostiDiv);

        let prviSto=this.makeElement("div","sto",prviRed);
        prviSto.id="1";
        prviSto.zauzet=false;
        let drugiSto=this.makeElement("div","sto",prviRed);
        drugiSto.id="2";
        drugiSto.zauzet=false;
        let treciSto=this.makeElement("div","sto",prviRed);
        treciSto.id="3";
        treciSto.zauzet=false;
        let cetvrtiSto=this.makeElement("div","sto",drugiRed);
        cetvrtiSto.id="4";
        cetvrtiSto.zauzet=false;
        let petiSto=this.makeElement("div","sto",drugiRed);
        petiSto.id="5";
        petiSto.zauzet=false;
        let sestiSto=this.makeElement("div","sto",drugiRed);
        sestiSto.id="6";
        sestiSto.zauzet=false;

        let stolovi$= of(prviSto,drugiSto, treciSto, cetvrtiSto, petiSto,sestiSto).subscribe(sto=>
            fromEvent(sto, 'click').subscribe(event =>
                this.createTableClickEvent(sto)
            )
        )
        roditelj.appendChild(gostiDiv);
    }

    createTableClickEvent(sto){
        if(sto.zauzet){
            document.getElementById("modalBackground").style.display='flex';
            this._tableClickID=sto.id;
           // console.log('Iz funkcije broj stola kliknuto ' + sto.id + sto.zauzet);
        }
        else alert("Na ovom stolu nema gostiju!");  
    }

// #endregion 

// #region Singer

    drawMainViewSinger(roditelj){
         // let pevacicaDiv=this.makeElement("div","pevacicaDiv",mainContainer);
         let pevacicaDiv=document.createElement("div");
         pevacicaDiv.className="pevacicaDiv";

         let tekstPesmeDiv=this.makeElement("div","tekstPesmeDiv",pevacicaDiv);
         tekstPesmeDiv.id="tekstPesmeDiv";
         tekstPesmeDiv.innerHTML="";
         let slikaPevaciceDiv=this.makeElement("div","slikaPevaciceDiv",pevacicaDiv);
         slikaPevaciceDiv.id="slikaPevaciceDiv";
         roditelj.appendChild(pevacicaDiv);
    }

//#endregion

//#region Modal

    createModal(par){
        let modalBack=document.createElement("div");
        modalBack.className="modalBackground";
        modalBack.id="modalBackground";
        let modalDiv=this.makeElement("div","modal",modalBack);

        let headerModalDiv=this.makeElement("div","headerModal",modalDiv);
        let topic=this.makeElement("label","topic",headerModalDiv)
        topic.innerHTML=(`Narudzbenica ${this._tableClickID}`);
        let exitBtn=this.makeElement("div","exitBtn",headerModalDiv);
        exitBtn.innerHTML="+";
    
        let songInput=this.makeElement("input","songInput",modalDiv)
        songInput.placeholder="Unesite ime pesme ili izvodjaca";
        songInput.id="songInput";
        let tipInput=this.makeElement("input","tipInput",modalDiv)
        tipInput.placeholder="Unesite baksis";
        tipInput.id="tipInput";

        let baseAnswerDiv=this.makeElement("div","baseAnswerDiv",modalDiv);
        baseAnswerDiv.innerHTML="";
        baseAnswerDiv.id="baseAnswerDiv";
        let orderBtn=this.makeElement("button","orderBtn",modalDiv);
        orderBtn.innerHTML="Naruci";

        this.createExitButtonEvent(exitBtn);
        this.createOrderButtonEvent(orderBtn,songInput,tipInput);

        par.appendChild(modalBack);
    }

    createExitButtonEvent(exitBtn){
        this._exitBtn$=fromEvent(exitBtn,'click').subscribe(event=>{
            document.getElementById("modalBackground").style.display='none';
            this.clearModal();
        }) 
    }

    //ovde pogledaj
    createOrderButtonEvent(orderBtn,songI){
        let formatedInput=this.formatInputString(songI.value);
        fromEvent(orderBtn,'click')
        .pipe(
            switchMap(() => this._service.getSongByName(formatedInput)
        )
        .subscribe(nadjenaPesma=>{
            this.checkOrder(nadjenaPesma)
            document.getElementById("modalBackground").style.display='none'
            this.clearModal();
        }))
    }
    //OVDE POGLEDAJ
    checkOrder(nadjenaPesma){
        let tipI=document.getElementById("tipInput");
        if(tipI.value===undefined)
             tipI.value='0';
        let tip=tipI.value.parseInt();
        if(nadjenaPesma!=null){
            let narudzbina=new Narudzbina(this._tableClickID,tip,nadjenaPesma.id);
            this._pevacica.addSong(narudzbina);
            alert(`Pesma ${nadjenaPesma.naziv} je narucena za sto broj ${this._tableClickID}!`)
        }
        else alert(`Nevalidan naziv, pesma nije narucena.`);
    }

    formatInputString(songName) {
        songName = songName.toLowerCase();
        songName.charAt(0).toUpperCase();
        return songName
      }
    
    clearModal(){
        let songI=document.getElementById("songInput").value="";
        let tipI=document.getElementById("tipInput").value="";

        let prikaz=document.getElementById("baseAnswerDiv");
        prikaz.innerHTML="";
        let lista=document.getElementById("listaUl");
        if(lista!=null)
            lista.style.display='none';
    }

    createSongSearchEvent(){
        let unos=document.getElementsByClassName("songInput");
        fromEvent(unos,'input')
        .pipe(
            debounceTime(1000),
            map(ev => ev.target.value),
            switchMap(text => this._service.getSongBySearchedValue(text).pipe(
                map(x => x.slice(0,10))
            ))
        )
        .subscribe(pronadjeno =>{
            this.drawSearchedSongs(pronadjeno)
        })
    }

    drawSearchedSongs(pronadjeno){
        let prikaz=document.getElementById("baseAnswerDiv");
        if(pronadjeno.length===0){
            prikaz.innerHTML="Zao nam je! Muzika ne zna datu pesmu!";
        }
        else{
            prikaz.innerHTML="";
            this.showSearchedSongs(pronadjeno,prikaz);
           // this.createListEvents();
        }
    }

    showSearchedSongs(pronadjeno,prikaz){
        let lista=document.createElement("ul");
        lista.className="listaUl";
        lista.id="listaUl";
        pronadjeno.forEach(element => {
            let id=element.id;
            let el=this.makeElement("li",id,lista);
            el.innerHTML=`${element.naziv}-${element.izvodjac}`;
        });
        lista.style.display='block';
        prikaz.appendChild(lista);
    }

    createListEvents(){
        //mogucnost, da se elementi liste naprave da budu dugmici, i da na klik, 
        //da se popune input polja, i samim tim odmah uzme id narucene pesme
    }

//#endregion


}