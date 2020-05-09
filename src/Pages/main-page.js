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
        drugiSto.id=("2");
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

        this.body.appendChild(mainContainer);
    }

    createTableClickEvent(sto){
        console.log('Iz funkcije broj stola kliknuto ' + sto.id + sto.zauzet);
        
    }

    


}