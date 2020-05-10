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

    drawMainView(){ //crta inicijalne stolove i pevacicu
        const mainContainer=document.getElementById("main-content");
        mainContainer.className="mainContainer";

        let gostiDiv=this.makeElement("div","gostiDiv",mainContainer);
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

        let pevacicaDiv=this.makeElement("div","pevacicaDiv",mainContainer);
        pevacicaDiv.innerHTML="Ovde muzika";
 
        let modal=this.createModal(mainContainer);
        this.body.appendChild(mainContainer);
    }

    createTableClickEvent(sto){
        if(sto.zauzet){
            document.querySelector('.modal-background').style.display='flex';
            console.log('Iz funkcije broj stola kliknuto ' + sto.id + sto.zauzet);
        }
        else alert("Na ovom stolu nema gostiju!");  
    }


    createModal(par){
        let modalBack=this.makeElement("div","modal-background",par);
        let modalDiv=this.makeElement("div","modal",modalBack);

        let headerModalDiv=this.makeElDivement("div","headerModal",modalDiv);
        let topic=this.makeElement("label","topic",headerModalDiv)
        topic.innerHTML=("Narudzbenica");
        let exitBtn=this.makeElement("button","exitBtn",headerModalDiv);
        exitBtn.innerHTML="x";
        
        let songInput=this.makeElement("input","songInput",modalDiv)
        songInput.placeholder="Unesite ime pesme ili izvodjaca";
        let baseAnswerDiv=this.makeElement("div","baseAnswerDiv",modalDiv);
        let tipInput=this.makeElement("input","tipInput",modalDiv)
        tipInput.placeholder="Unesite baksis";
        let orderBtn=this.makeElement("button","orderBtn",modalDiv);
        orderBtn.innerHTML="Naruci";
    }

    


}