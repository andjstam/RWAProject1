import '../../css/initial-closing-page.css'

export class ClosingPage{
    
    _body:HTMLDivElement;

    constructor(){
        this._body=document.getElementById("main") as HTMLDivElement;
    }

   makeElement(el:any, name:String, parent:HTMLDivElement)
    {
        let element=document.createElement(el);
        element.className=name;
        parent.appendChild(element);
        return element;
    }

    drawClosingPage(){
        this._body.innerHTML="";

        let glavniDiv:HTMLDivElement=document.createElement("div");
        glavniDiv.className="glavniDiv";
        
        let paragraf:HTMLParagraphElement=this.makeElement("p","paragraf",glavniDiv);
        paragraf.id="paragraf";
        paragraf.innerHTML='Hvala na dolasku, nadam se da ste uživali!';

        let naslov:HTMLLabelElement=this.makeElement("label","naslov",glavniDiv);
        naslov.id="naslov";
        naslov.innerHTML='Doviđenja!'

        this._body.appendChild(glavniDiv);
        
    }
}