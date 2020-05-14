import {of, fromEvent, Observable, BehaviorSubject, merge, zip} from 'rxjs';
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
        this._ukupnaZarada=0;
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

        let prviSto=this.makeElement("div","sto1",prviRed);
        prviSto.id="1";
        prviSto.zauzet=false;
        let drugiSto=this.makeElement("div","sto2",prviRed);
        drugiSto.id="2";
        drugiSto.zauzet=false;
        let treciSto=this.makeElement("div","sto3",prviRed);
        treciSto.id="3";
        treciSto.zauzet=false;
        let cetvrtiSto=this.makeElement("div","sto3",drugiRed);
        cetvrtiSto.id="4";
        cetvrtiSto.zauzet=false;
        let petiSto=this.makeElement("div","sto4",drugiRed);
        petiSto.id="5";
        petiSto.zauzet=false;
        let sestiSto=this.makeElement("div","sto1",drugiRed);
        sestiSto.id="6";
        sestiSto.zauzet=false;

        let prviRed$=of(prviSto,drugiSto, treciSto);
        let drugiRed$=of(cetvrtiSto, petiSto,sestiSto);
        this.mergeTableClickEvent(prviRed$,drugiRed$);

        roditelj.appendChild(gostiDiv);
    }

    mergeTableClickEvent(prviR,drugiR){
        merge(
            prviR,
            drugiR
        ).subscribe(sto =>{
            fromEvent(sto, 'click').subscribe(event =>{
                        this._tableClickID=sto.id;
                        this.createTableClickEvent(sto);
                 })
            })  
    }

    createTableClickEvent(sto){
        if(sto.zauzet){
            document.getElementById("modalBackground").style.display='flex';
        }
        else alert("Na ovom stolu nema gostiju!");  
    }

// #endregion 

// #region Singer

    drawMainViewSinger(roditelj){

         let pevacicaDiv=document.createElement("div");
         pevacicaDiv.className="pevacicaDiv";

         this._pevacica.addSong(new Narudzbina(0,34,0));
         this._pevacica.addSong(new Narudzbina(0,6,0));
         this._pevacica.addSong(new Narudzbina(0,21,0));

         let tekstPesmeDiv=this.makeElement("div","tekstPesmeDiv",pevacicaDiv);
         tekstPesmeDiv.id="tekstPesmeDiv";
         tekstPesmeDiv.innerHTML="";
         let slikaPevaciceDiv=this.makeElement("div","slikaPevaciceDiv",pevacicaDiv);
         slikaPevaciceDiv.id="slikaPevaciceDiv";
         roditelj.appendChild(pevacicaDiv);
         let zarada=this.makeElement("div","zarada",pevacicaDiv);
         zarada.id="zarada";
         zarada.innerHTML="Ukupna zarada:";

         this.makeSubjectSinger(tekstPesmeDiv);
         let observerSinger=this._behaviorSinger.subscribe(
             tekst => tekstPesmeDiv.innerHTML=`${tekst}`
         )
    }

    makeSubjectSinger(tekstPesmeDiv){
        let kraj=document.getElementById("btnZaustavi");
        let cancel$=fromEvent(kraj,'click');
        
        let timer$=new Observable(subscriber =>{
            let intervalID = setInterval(() => {
                if(this._pevacica.narucenePesme.length===0)
                      subscriber.next("Orkestar se štimuje");
                else{
                    let narudzbenicaTrenutnePesme=this._pevacica.singASong();
                    let trenutnaPesmaId=narudzbenicaTrenutnePesme.pesma;
                    this._service.getSongById(trenutnaPesmaId).subscribe(pesma =>{
                        this.changeTableColorWhenSongIsPlaying(narudzbenicaTrenutnePesme);
                        subscriber.next(pesma.tekst)
                    })  
                }
            },9000)
        }).pipe(
            takeUntil(cancel$)
        )

        timer$.subscribe(this._behaviorSinger);
    }

    changeTableColorWhenSongIsPlaying(narudzbina){
        let idStola=narudzbina.gost;
        if(idStola!=0){
            let htmlSto=document.getElementById(idStola);
            htmlSto.style.backgroundColor='rgb(160, 34, 34)';
            setTimeout(()=>{
                htmlSto.style.backgroundColor='rgb(222, 145, 135)';
            },7000)
        }
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
        orderBtn.id="orderBtn";
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

    createOrderButtonEvent(orderBtn,songI,tipInput){

        let tipObserv$=fromEvent(tipInput,'input').pipe( 
            debounceTime(1000),
            map(ev => ev.target.value));     
        let orderObs$=fromEvent(orderBtn,'click');

        zip(tipObserv$,
            orderObs$
        ).pipe(
            map(([suma,event]) => ({suma, event}))
        ).subscribe(sumaEvent => {
            
            let song=this.formatInputString(songI.value);
            this._service.getSongByName(song)
            .subscribe(nadjenaPesma => {
                this.checkOrder(nadjenaPesma, sumaEvent.suma);
            });
            this.countTip(sumaEvent.suma);
            document.getElementById("modalBackground").style.display='none';
            this.clearModal();
        })
      
    }

    formatInputString(songName) {
        songName = songName.toLowerCase();
        return songName.charAt(0).toUpperCase() + songName.slice(1);
    } 
    
    checkOrder(nadjenaPesma,tip){

        if(nadjenaPesma.length===0)
            alert(`Nevalidan naziv, pesma nije narucena.`);
        else{
            let narudzbina=new Narudzbina(this._tableClickID,nadjenaPesma[0].id,tip);
            this._pevacica.addSong(narudzbina);
            console.log(narudzbina);
            console.log(this._pevacica.narucenePesme);
            alert(`Pesma "${nadjenaPesma[0].naziv}" je narucena za sto broj ${this._tableClickID}!`)
        } 
    }

    countTip(suma){
        let zaradaDiv=document.getElementById("zarada");
        this._ukupnaZarada= +this._ukupnaZarada + +suma;
        console.log(`Kad se sracuna ${this._ukupnaZarada}`);
        zaradaDiv.innerHTML=`Ukupna zarada: ${this._ukupnaZarada}`;
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