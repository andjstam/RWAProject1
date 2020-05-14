import {Router} from '../../router/router'
import {fromEvent} from 'rxjs'
import '../../css/initial-closing-page.css'

export class InitialPage{
    _router:Router;
    _body:HTMLDivElement;

    constructor(){
        this._router=new Router;
        this._body=document.getElementById("main-content") as HTMLDivElement; 
    }

    makeElement(el:any, name:String, parent:HTMLDivElement)
    {
        let element=document.createElement(el);
        element.className=name;
        parent.appendChild(element);
        return element;
    }

    drawInitialPage(){

        let glavniDiv:HTMLDivElement=document.createElement("div");
        glavniDiv.className="glavniDiv";
        glavniDiv.id="glavniDiv";

        let naslov:HTMLLabelElement=this.makeElement("label","naslov",glavniDiv);
        naslov.id="naslov";
        naslov.innerHTML=`Dobrodošli u kafanu Boemska!`;

        let paragraf:HTMLParagraphElement=this.makeElement("p","paragraf",glavniDiv);
        paragraf.id="paragraf";
        paragraf.innerHTML=`Pripremite se za buđenje najskrivenijih emocija, uz naše boemske pesme i puno dobrog vina. Pritisnite dugme za početak.`

        let dugme:HTMLButtonElement=this.makeElement("button","dugme",glavniDiv);
        dugme.innerHTML="Početak";
        fromEvent(dugme,'click')
        .subscribe(event =>{
            this._router.navigateToMainPage();
        })

        this._body.appendChild(glavniDiv);
    }
}