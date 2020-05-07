import '../../css/main-page.css';

export class MainPage{
    
    constructor(){
        this.mainContainer=document.getElementById("main");
    }

    drawMainView(){
    //dva diva(row), u jednom crta inicijalne stolove, u drugom pevaljku

        const dobrodoslica=document.createElement("h2");
        dobrodoslica.className="dobrdoslica";
        dobrodoslica.innerHTML="Dobrodosli u kafanu Boemska!";
        this.mainContainer.appendChild(dobrodoslica);
    }

    drawGuest(){
    //kada se klikne dugmence dodajGosta onda se dodaju sve forme za upis itd..

    }

    


}