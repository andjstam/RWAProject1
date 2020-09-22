import {of, fromEvent, Observable, BehaviorSubject, merge, zip} from 'rxjs';
import {debounceTime, switchMap, map, takeUntil, take} from 'rxjs/operators';
import {SongService} from '../../services/song-service';
import {Narudzbina} from '../../models/narudzbina';
import {Pevacica} from '../../models/pevacica'
import {Pesma} from '../../models/pesma'
import '../../css/main-page.css';
import { Gosti } from '../../models/gosti';
import { PesmaRequest } from '../../models/pesmaRequest';

export class MainPage{

    body:HTMLDivElement;
    _service:SongService;
    _pevacica:Pevacica;
    _behaviorSinger:any;
    _gosti:Gosti;
    _tableClickID:number;
    _ukupnaZarada:number;
    
    constructor(){
        this.body=document.getElementById("main") as HTMLDivElement;
        this._service=new SongService();
        this._pevacica=new Pevacica();
        this._behaviorSinger=new BehaviorSubject("Dobrodošli!");
        this._gosti=new Gosti();
        this._tableClickID=0;
        this._ukupnaZarada=0;
    }

    makeElement(el:any, name:String, parent:HTMLDivElement)
    {
        let element=document.createElement(el);
        element.className=name;
        parent.appendChild(element);
        return element;
    }

    drawMainView(){ 
         const mainContainer:HTMLDivElement=document.getElementById("main-content") as HTMLDivElement;
         mainContainer.className="mainContainer";

         this.drawMainViewGuests(mainContainer);
         this.drawMainViewSinger(mainContainer);
         this.createModalOrder(mainContainer);
         this.createModalAddSong(mainContainer);
         this.createSongSearchEvent();
         this.body.appendChild(mainContainer);
    }

 // #region Guests

    drawMainViewGuests(roditelj:HTMLDivElement){
    
        let gostiDiv:HTMLDivElement=document.createElement("div");
        gostiDiv.className="gostiDiv";

        let prviRed:HTMLDivElement=this.makeElement("div","prviRed",gostiDiv);
        let prostor:HTMLDivElement=this.makeElement("div","prostor",gostiDiv);
        let drugiRed:HTMLDivElement=this.makeElement("div","drugiRed",gostiDiv);

        let prviSto:HTMLDivElement=this.makeElement("div","sto1",prviRed);
        prviSto.id="1";
        let drugiSto:HTMLDivElement=this.makeElement("div","sto2",prviRed);
        drugiSto.id="2";
        let treciSto:HTMLDivElement=this.makeElement("div","sto3",prviRed);
        treciSto.id="3";
        let cetvrtiSto:HTMLDivElement=this.makeElement("div","sto3",drugiRed);
        cetvrtiSto.id="4";
        let petiSto:HTMLDivElement=this.makeElement("div","sto4",drugiRed);
        petiSto.id="5";
        let sestiSto:HTMLDivElement=this.makeElement("div","sto1",drugiRed);
        sestiSto.id="6";

        let prviRed$=of(prviSto,drugiSto, treciSto);
        let drugiRed$=of(cetvrtiSto, petiSto,sestiSto);
        merge(
            prviRed$,
            drugiRed$
        ).subscribe((sto:HTMLDivElement) =>{
            fromEvent(sto, 'click').subscribe(() =>{
                        this._tableClickID=parseInt(sto.id);
                        this.createTableClickEvent(sto);
                 })
            })  

        roditelj.appendChild(gostiDiv);
    }

    createTableClickEvent(sto:HTMLDivElement){
        if(!this._gosti.checkIfAvailable(sto.id)){
            (document.getElementById("modalBackground") as HTMLDivElement).style.display='flex';
        }
        else alert("Na ovom stolu nema gostiju!");  
    }

// #endregion 

// #region Singer

    drawMainViewSinger(roditelj:HTMLDivElement){

         let pevacicaDiv:HTMLDivElement=document.createElement("div");
         pevacicaDiv.className="pevacicaDiv";

         this._pevacica.addSong(new Narudzbina(0,34,0));
         this._pevacica.addSong(new Narudzbina(0,6,0));
         this._pevacica.addSong(new Narudzbina(0,21,0));

         let tekstPesmeDiv:HTMLDivElement=this.makeElement("div","tekstPesmeDiv",pevacicaDiv);
         tekstPesmeDiv.id="tekstPesmeDiv";
         tekstPesmeDiv.innerHTML="";
         let slikaPevaciceDiv:HTMLDivElement=this.makeElement("div","slikaPevaciceDiv",pevacicaDiv);
         slikaPevaciceDiv.id="slikaPevaciceDiv";
         roditelj.appendChild(pevacicaDiv);
         let zarada:HTMLDivElement=this.makeElement("div","zarada",pevacicaDiv);
         zarada.id="zarada";
         zarada.innerHTML="Ukupna zarada:";

         this.makeSubjectSinger();
         let observerSinger=this._behaviorSinger.subscribe(
             (tekst:string) => tekstPesmeDiv.innerHTML=`${tekst}`
         )
    }

    makeSubjectSinger(){
        //let kraj=document.getElementById("btnZaustavi") as HTMLButtonElement;
        let kraj=document.getElementById("btnKraj") as HTMLButtonElement;
        let cancel$=fromEvent(kraj,'click');
        
        let timer$=new Observable(subscriber =>{
            let intervalID = setInterval(() => {
                if(this._pevacica.narucenePesme.length===0)
                      subscriber.next("Orkestar se štimuje");
                else{
                    let narudzbenicaTrenutnePesme=this._pevacica.singASong();
                    if(narudzbenicaTrenutnePesme){
                        let idStola:number=narudzbenicaTrenutnePesme.gost;
                        let trenutnaPesmaId=narudzbenicaTrenutnePesme.pesma;
                        this._service.getSongById(trenutnaPesmaId).subscribe((pesma:Pesma) =>{
                            this.changeTableColorWhenSongIsPlaying(idStola);
                            subscriber.next(pesma.tekst);
                        })  
                }}
            },3000)
        }).pipe(
            takeUntil(cancel$)
        )

        timer$.subscribe(this._behaviorSinger);
    }

    changeTableColorWhenSongIsPlaying(idStola:number){
        if(idStola!=0){
            let idStolaString=idStola.toString();
            let htmlSto=document.getElementById(idStolaString) as HTMLDivElement;
            htmlSto.style.backgroundColor='rgb(160, 34, 34)';
            setTimeout(()=>{
                htmlSto.style.backgroundColor='rgb(222, 145, 135)';
            },7000)
        }
    }

//#endregion

//#region Modal Order

    createModalOrder(par:HTMLDivElement){

        let modalBack:HTMLDivElement=document.createElement("div");
        modalBack.className="modalBackground";
        modalBack.id="modalBackground";
        let modalDiv:HTMLDivElement=this.makeElement("div","modal",modalBack);

        let headerModalDiv:HTMLDivElement=this.makeElement("div","headerModal",modalDiv);
        let topic:HTMLLabelElement=this.makeElement("label","topic",headerModalDiv)
        topic.innerHTML=(`Narudžbenica`);
        let exitBtn:HTMLButtonElement=this.makeElement("div","exitBtn",headerModalDiv);
        exitBtn.innerHTML="+";
    
        let songInput:HTMLInputElement=this.makeElement("input","songInput",modalDiv);
        songInput.placeholder="Unesite pun naziv pesme za naručivanje";
        songInput.id="songInput";
        let tipInput:HTMLInputElement=this.makeElement("input","tipInput",modalDiv)
        tipInput.placeholder="Unesite bakšiš (obavezno polje)";
        tipInput.id="tipInput";

        let baseAnswerDiv:HTMLDivElement=this.makeElement("div","baseAnswerDiv",modalDiv);
        baseAnswerDiv.innerHTML="";
        baseAnswerDiv.id="baseAnswerDiv";
        let orderBtn:HTMLButtonElement=this.makeElement("button","orderBtn",modalDiv);
        orderBtn.id="orderBtn";
        orderBtn.innerHTML="Naruči";

        this.createExitButtonEvent(exitBtn);
        this.createOrderButtonEvent(orderBtn,songInput,tipInput);

        par.appendChild(modalBack);
    }

    createExitButtonEvent(exitBtn:HTMLButtonElement){
            fromEvent(exitBtn,'click').subscribe(event=>{
            (document.getElementById("modalBackground") as HTMLDivElement).style.display='none';
            this.clearModal();
        }) 
    }

    createOrderButtonEvent(orderBtn:HTMLButtonElement,songI:HTMLInputElement,tipInput:HTMLInputElement){

        let tipObserver$=fromEvent(tipInput,'input').pipe( 
            debounceTime(1000),
            map(ev => (ev.target as HTMLInputElement).value));     
        let orderObserver$=fromEvent(orderBtn,'click');

        zip(tipObserver$,
            orderObserver$
        ).pipe(
            map(([suma,event]) => ({suma, event}))
        ).subscribe(sumaEvent => {
            let sumaBroj:number=parseInt(sumaEvent.suma);
            let song:string=this.formatInputString(songI.value);
            this._service.getSongByName(song)
            .subscribe( (nadjenaPesma) => {     
                this.checkOrder(nadjenaPesma, sumaBroj);
            });
            this.countTip(sumaBroj);
            (document.getElementById("modalBackground") as HTMLDivElement).style.display='none';
            this.clearModal();
        })
      
    }

    formatInputString(songName:String) {
        songName = songName.toLowerCase();
        return songName.charAt(0).toUpperCase() + songName.slice(1);
    } 
    
    checkOrder(nadjenaPesma:any,tip:number){        
        if(nadjenaPesma.length===0)
            alert(`Nevalidan naziv, pesma nije naručena.`);
        else{
            let narudzbina:Narudzbina=new Narudzbina(this._tableClickID,nadjenaPesma[0].id,tip);
            this._pevacica.addSong(narudzbina);
            console.log(narudzbina);
            console.log(this._pevacica.narucenePesme);
            alert(`Pesma "${nadjenaPesma[0].naziv}" je naručena za sto broj ${this._tableClickID}!`)
        } 
    }

    countTip(suma:number){          
        let zaradaDiv:HTMLDivElement=document.getElementById("zarada") as HTMLDivElement;
        this._ukupnaZarada= +this._ukupnaZarada + +suma;
        zaradaDiv.innerHTML=`Ukupna zarada: ${this._ukupnaZarada}`;
    }
    
    clearModal(){
        (document.getElementById("songInput") as HTMLInputElement).value="";
        (document.getElementById("tipInput") as HTMLInputElement).value="";

        let prikaz=document.getElementById("baseAnswerDiv") as HTMLDivElement;
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
            map(ev =>  (ev.target as HTMLInputElement).value),
            switchMap(text => this._service.getSongBySearchedValue(text).pipe(
                map(x => x.slice(0,10),
                take(10)
            )))
        )
        .subscribe(pronadjeno =>{
            this.drawSearchedSongs(pronadjeno)
        })
    }

    drawSearchedSongs(pronadjeno:any){
        let prikaz=document.getElementById("baseAnswerDiv") as HTMLDivElement;
        if(pronadjeno.length===0){
            prikaz.innerHTML="Žao nam je! Pevačica ne zna datu pesmu!";
        }
        else{
            prikaz.innerHTML="";
            this.showSearchedSongs(pronadjeno,prikaz);
        }
    }

    showSearchedSongs(pronadjeno:any,prikaz:HTMLDivElement){
        
        let lista:HTMLUListElement=document.createElement("ul");
        lista.className="listaUl";
        lista.id="listaUl";
        pronadjeno.forEach((element:Pesma) => {
            let el=document.createElement("li");
            lista.appendChild(el);
            el.innerHTML=`${element.naziv}-${element.izvodjac}`;
        });
        lista.style.display='block';
        prikaz.appendChild(lista);
    }

//#endregion


//#region Modal Add Song

    createModalAddSong(par:HTMLDivElement){

        let modalBack:HTMLDivElement=document.createElement("div");
        modalBack.className="modalBackground";
        modalBack.id="modalBackgroundAddSong";
        let modalDiv:HTMLDivElement=this.makeElement("div","modal",modalBack);

        let headerModalDiv:HTMLDivElement=this.makeElement("div","headerModal",modalDiv);
        let topic:HTMLLabelElement=this.makeElement("label","topicAddSong",headerModalDiv)
        topic.innerHTML=(`Dodaj novu pesmu koju će orkestar znati`);
        let exitBtnAddSong:HTMLButtonElement=this.makeElement("div","exitBtn",headerModalDiv);
        exitBtnAddSong.innerHTML="+";

        let songInput:HTMLInputElement=this.makeElement("input","songInput",modalDiv);
        songInput.placeholder="Unesite naziv pesme";
        songInput.id="songNameInput";
        let singerInput:HTMLInputElement=this.makeElement("input","songInput",modalDiv)
        singerInput.placeholder="Unesite ime i prezime izvođača pesme";
        singerInput.id="singerInput"
        let songTextInput:HTMLInputElement=this.makeElement("input","songInput",modalDiv)
        songTextInput.placeholder="Unesite tekst pesme";
        songTextInput.id="songTextInput";

        let baseAnswerDiv:HTMLDivElement=this.makeElement("div","baseAnswerDiv",modalDiv);
        baseAnswerDiv.innerHTML="";
        baseAnswerDiv.id="baseAnswerDiv1";
        let addSongBtn:HTMLButtonElement=this.makeElement("button","addSongBtn",modalDiv);
        addSongBtn.id="addSongBtn";
        addSongBtn.innerHTML="Dodaj pesmu";

        this.createExitBtnEvent(exitBtnAddSong);
        this.createAddSongBtnEvent(addSongBtn,songInput, singerInput, songTextInput)

        par.appendChild(modalBack);
    }

    createExitBtnEvent(exitBtn:HTMLButtonElement){
        fromEvent(exitBtn,'click').subscribe(event=>{
        (document.getElementById("modalBackgroundAddSong") as HTMLDivElement).style.display='none';
        this.clearAddSongModal();
    }) 
    }

    createAddSongBtnEvent(addSongBtn:HTMLButtonElement,songI:HTMLInputElement,singerI:HTMLInputElement, text: HTMLInputElement){
        fromEvent(addSongBtn,'click').subscribe(
            event =>{
            let tekst: string= "♬"+ text.value + " ♬ ♪ ♬";
            let pesma= new PesmaRequest(songI.value, singerI.value, tekst);
            this._service.postNewSong(pesma)
            .subscribe((pesma : Pesma) => {
                    //DA PROVERIM DA LI TE PESME VEC IMA U BAZI!
                    // console.log("Dodata pesma:")
                    // console.log(pesma);
                    alert (`Uspesno dodata pesma ${pesma.naziv}! Sada možete i ovu pesmu naručiti!`);
                    (document.getElementById("modalBackgroundAddSong") as HTMLDivElement).style.display='none';
                },
                err=> alert("Dogodila se greška prilikom upisa pesme u bazu!")
            )
            this.clearAddSongModal();
            }
        )
    }

    clearAddSongModal(){
        (document.getElementById("songNameInput") as HTMLInputElement).value="";
        (document.getElementById("singerInput") as HTMLInputElement).value="";
        (document.getElementById("songTextInput") as HTMLInputElement).value="";
    }
}

//#endregion