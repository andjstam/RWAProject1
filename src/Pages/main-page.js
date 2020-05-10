import {of, fromEvent } from 'rxjs';
import '../../css/main-page.css';

export class MainPage{
    
    constructor(){
        this.body=document.getElementById("main");
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
            document.querySelector('.modal-background').style.display='flex';
            console.log('Iz funkcije broj stola kliknuto ' + sto.id + sto.zauzet);
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
        modalBack.className="modal-background";
        let modalDiv=this.makeElement("div","modal",modalBack);

        let headerModalDiv=this.makeElement("div","headerModal",modalDiv);
        let topic=this.makeElement("label","topic",headerModalDiv)
        topic.innerHTML=("Narudzbenica");
        let exitBtn=this.makeElement("div","exitBtn",headerModalDiv);
        exitBtn.innerHTML="+";
        fromEvent(exitBtn,'click').subscribe(event=>
            document.querySelector('.modal-background').style.display='none'
        )
        
        let songInput=this.makeElement("input","songInput",modalDiv)
        songInput.placeholder="Unesite ime pesme ili izvodjaca";
        let baseAnswerDiv=this.makeElement("div","baseAnswerDiv",modalDiv);
        let tipInput=this.makeElement("input","tipInput",modalDiv)
        tipInput.placeholder="Unesite baksis";
        let orderBtn=this.makeElement("button","orderBtn",modalDiv);
        orderBtn.innerHTML="Naruci";

        par.appendChild(modalBack);
    }
//#endregion


}