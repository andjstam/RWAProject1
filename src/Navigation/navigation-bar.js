import {fromEvent} from 'rxjs'
import {Gosti} from '../../models/gosti.js'
import '../../css/navigation-bar.css';


export class NavigationBar{

   constructor(){
      this.rootContainer=document.getElementById("main");
      this.gosti=new Gosti();
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
      this.addGuestButtonClick(dugme2);

      const dugme3=document.createElement("button");
      dugme3.className="dugme";
      dugme3.id="btnIzbaciGosta";
      dugme3.innerHTML="Izbaci gosta";
      navContainer.appendChild(dugme3);
      fromEvent(dugme3,'click')
      .subscribe(event =>{
         this.deleteGuest();
      })

      const dugme4=document.createElement("button");
      dugme4.className="dugme";
      dugme4.id="btnKraj";
      dugme4.innerHTML="Kraj";
      navContainer.appendChild(dugme4);

      this.rootContainer.appendChild(navContainer);
   }

   addGuestButtonClick(btn){
      fromEvent(btn,'click')
      .subscribe(event =>{
         if(this.gosti.areThereAvailableTables()){
            let idStola=parseInt(Math.random()*6 + 1);
            this.addGuestIfAvailable(idStola);
         }
         else alert("Zao nam je, nema vise slobodnih stolova!");
      })
   }

   addGuestIfAvailable(idStola)
   {
      let htmlSto=document.getElementById(idStola);
      if(htmlSto.zauzet===false){
         this.gosti.addEl(idStola);
         htmlSto.zauzet=true;
         htmlSto.style.backgroundColor='rgb(222, 145, 135)';
         console.log(this.gosti.niz);
      }
      else return;
   }

   deleteGuest(){
      if(this.gosti.niz.length===0)
         alert("Kafana je prazna, nema gostiju!");
      else {
         let ispraznjeniSto=document.getElementById(this.gosti.deleteEl());
         ispraznjeniSto.zauzet=false;
         ispraznjeniSto.style.backgroundColor='teal';
         console.log(this.gosti.niz);
      }
   }
}
