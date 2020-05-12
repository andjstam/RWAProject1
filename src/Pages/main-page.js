import {of, fromEvent, Observable, BehaviorSubject} from 'rxjs';
import {debounceTime, switchMap, map, takeUntil, take} from 'rxjs/operators';
import {SongService} from '../../services/song-service';
import {Narudzbina} from '../../models/narudzbina';
import {Pevacica} from '../../models/pevacica'
import '../../css/main-page.css';

export class MainPage{
    
    constructor(){
        this.body=document.getElementById("main");
        this._service=new SongService();
        this._pevacica=new Pevacica();
        this._behaviorSinger=new BehaviorSubject("Dobrodosli!");
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

        // let prviRed$=of(prviSto,drugiSto, treciSto);
        // let drugiRed$=of(cetvrtiSto, petiSto,sestiSto);
        // merge(
        //     prviRed$,
        //     drugiRed$
        // ).subscribe(sto =>{
        //     fromEvent(sto, 'click').subscribe(event =>{
        //                 this._tableClickID=sto.id;
        //                 this.createTableClickEvent(sto);
        //          })
        //     })    
        let stolovi$= of(prviSto,drugiSto, treciSto, cetvrtiSto, petiSto,sestiSto).subscribe(sto=>
            fromEvent(sto, 'click').subscribe(event =>{
                this._tableClickID=sto.id;
                this.createTableClickEvent(sto)

            })
        )
        roditelj.appendChild(gostiDiv);
    }

    createTableClickEvent(sto){
        if(sto.zauzet){
            document.getElementById("modalBackground").style.display='flex';
            //console.log('Iz funkcije TableClick, broj stola je ' + this._tableClickID + sto.zauzet);
        }
        else alert("Na ovom stolu nema gostiju!");  
    }

// #endregion 

// #region Singer

    drawMainViewSinger(roditelj){
         
         let pevacicaDiv=document.createElement("div");
         pevacicaDiv.className="pevacicaDiv";

         let tekstPesmeDiv=this.makeElement("div","tekstPesmeDiv",pevacicaDiv);
         tekstPesmeDiv.id="tekstPesmeDiv";
         tekstPesmeDiv.innerHTML="";
         let slikaPevaciceDiv=this.makeElement("div","slikaPevaciceDiv",pevacicaDiv);
         slikaPevaciceDiv.id="slikaPevaciceDiv";
         roditelj.appendChild(pevacicaDiv);

         this.makeSubjectSinger(tekstPesmeDiv);
    }

    makeSubjectSinger(tekstPesmeDiv){
        let kraj=document.getElementById("btnKraj");
        let cancel$=fromEvent(kraj,'click');
        
        let timer$=new Observable(subscriber =>{
            let intervalID = setInterval(() => {
                if(this._pevacica.narucenePesme.length===0)
                      subscriber.next("Orkestar se štimuje");
                else{
                    let narudzbenicaTrenutnePesme=this._pevacica.singASong();
                    let trenutnaPesmaId=narudzbenicaTrenutnePesme.pesma;
                    this._service.getSongById(trenutnaPesmaId).subscribe(pesma => 
                        subscriber.next(pesma.tekst)
                    )  
                }
            },6000)
        }).pipe(
            takeUntil(cancel$)
        )
        .subscribe(
            el=>{ tekstPesmeDiv.innerHTML=`${el}`;
            console.log(el)},
            null,
            ()=>console.log("all done!")
        );

        this._behaviorSinger.subscribe(timer$);
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
        topic.innerHTML=(`Narudzbenica`);
        let exitBtn=this.makeElement("div","exitBtn",headerModalDiv);
        exitBtn.innerHTML="+";
    
        let songInput=this.makeElement("input","songInput",modalDiv);
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
        this.createOrderButtonEvent(orderBtn,songInput);

        par.appendChild(modalBack);
    }

    createExitButtonEvent(exitBtn){
        this._exitBtn$=fromEvent(exitBtn,'click').subscribe(event=>{
            document.getElementById("modalBackground").style.display='none';
            this.clearModal();
        }) 
    }

    createOrderButtonEvent(orderBtn,songI){

        let orders$=fromEvent(orderBtn,'click').subscribe(event =>{
            let song=this.formatInputString(songI.value);
            let tipI=parseInt(document.getElementById("tipInput").value);
            this._service.getSongByName(song)
            .subscribe(nadjenaPesma => {
                this.checkOrder(nadjenaPesma, tipI);
            });
            document.getElementById("modalBackground").style.display='none';
            this.clearModal();
        })
    }
    //iskoristi zip za oba input polja, da se sacekaju i onda spoje, a kad se klikne na naruci da se samo napravi objekat

    formatInputString(songName) {
        songName = songName.toLowerCase();
        return songName.charAt(0).toUpperCase() + songName.slice(1);
    } 
    
    checkOrder(nadjenaPesma,tip){
        if(isNaN(tip))
             tip=0;
        if(nadjenaPesma.length===0)
            alert(`Nevalidan naziv, pesma nije narucena.`);
        else{
            let narudzbina=new Narudzbina(this._tableClickID,nadjenaPesma[0].id,tip);
            this._pevacica.addSong(narudzbina);
            console.log(narudzbina);
            console.log(this._pevacica.narucenePesme);
            alert(`Pesma ${nadjenaPesma[0].naziv} je narucena za sto broj ${this._tableClickID}!`)
        } 
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
                map(x => x.slice(0,10),
                take(10))
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


//#endregion


}