import {fromEvent} from 'rxjs'
import '../../css/navigation-bar.css';


export class NavigationBar{

   constructor(){
      this.rootContainer=document.getElementById("main");
   }
   
   drawNavigation(){
      const navContainer=document.getElementById("navigation-bar");
      navContainer.className="navContainer";

      const logo=document.createElement("label");
      logo.className="logo";
      logo.innerHTML="Boemska";
      navContainer.appendChild(logo);
    
      const dugme1=document.createElement("button");
      dugme1.className="dugme";
      dugme1.id="btnPocetak";
      dugme1.innerHTML="Pocetak";
   
      navContainer.appendChild(dugme1);
      const dugme2=document.createElement("button");
      dugme2.className="dugme";
      dugme2.id="btnDodajGosta";
      dugme2.innerHTML="Dodaj gosta";
      navContainer.appendChild(dugme2);
      const dugme3=document.createElement("button");
      dugme3.className="dugme";
      dugme3.id="btnKraj";
      dugme3.innerHTML="Kraj";
      navContainer.appendChild(dugme3);

      this.rootContainer.appendChild(navContainer);
   }

   startButtonClick(btn){
      fromEvent(dugme1,'click')
      .subscribe(event =>{
         let idStola=Math.random()*5 + 1;
         //uzmi sa tim indeksom, primeni boju, stavi zauzet na true;
      })
   }
}
