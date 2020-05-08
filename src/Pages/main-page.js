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
    //dva diva(row), u jednom crta inicijalne stolove, u drugom pevaljku
        const mainContainer=document.getElementById("main-content");
        mainContainer.className="mainContainer";

        let gostiDiv=this.makeElement("div","gostiDiv",mainContainer);
        gostiDiv.innerHTML="Ovde ce gosti";
        let pevacicaDiv=this.makeElement("div","pevacicaDiv",mainContainer);
        pevacicaDiv.innerHTML="Ovde muzika";

        this.body.appendChild(mainContainer);
    }

    drawGuest(){
    //kada se klikne dugmence dodajGosta onda se dodaju sve forme za upis itd..

    }

    


}