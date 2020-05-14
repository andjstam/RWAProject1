
export class ClosingPage{

    constructor(){
        this._body=document.getElementById("main");
    }

    makeElement(el, name, parent)
    {
        let element=document.createElement(el);
        element.className=name;
        parent.appendChild(element);
        return element;
    }

    drawClosingPage(){
        this._body.innerHTML="";

        let glavniDiv=document.createElement("div");
        glavniDiv.className="glavniDiv";
        
        let paragraf=this.makeElement("p","paragraf",glavniDiv);
        paragraf.id="paragraf";
        paragraf.innerHTML='Hvala na dolasku, nadam se da ste uživali!';

        let naslov=this.makeElement("label","naslov",glavniDiv);
        naslov.id="naslov";
        naslov.innerHTML='Doviđenja!'

        this._body.appendChild(glavniDiv);
        
    }
}