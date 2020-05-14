import {fromEvent} from 'rxjs'
import {Router} from '../../router/router'
import {Gosti} from '../../models/gosti.js'
import {Gost} from '../../models/gost'
import {MainPage} from './main-page'
import '../../css/navigation-bar.css';


export class NavigationBar{

   constructor(){
      this.rootContainer=document.getElementById("main");
      this._router=new Router();
      this._mainPage=new MainPage();
      this.gosti=new Gosti();
   }
   
   drawNavigation(){
      //this.rootContainer.innerHTML="";
      let prethodni=document.getElementById("main-content");
      prethodni.innerHTML="";

      const navContainer=document.getElementById("navigation-bar");
      navContainer.className="navContainer";

      const logo=document.createElement("label");
      logo.className="logo";
      logo.innerHTML="Boemska";
      navContainer.appendChild(logo);

      const dugme1=document.createElement("button");
      dugme1.className="dugme";
      dugme1.id="btnDodajGosta";
      dugme1.innerHTML="Dodaj gosta";
      navContainer.appendChild(dugme1);
      this.addGuestButtonClick(dugme1);

      const dugme2=document.createElement("button");
      dugme2.className="dugme";
      dugme2.id="btnIzbaciGosta";
      dugme2.innerHTML="Izbaci gosta";
      navContainer.appendChild(dugme2);
      fromEvent(dugme2,'click')
      .subscribe(event =>{
         this.deleteGuest();
      })

      const dugme3=document.createElement("button");
      dugme3.className="dugme";
      dugme3.id="btnZaustavi";
      dugme3.innerHTML="Zaustavi";
      navContainer.appendChild(dugme3);

      const dugme4=document.createElement("button");
      dugme4.className="dugme";
      dugme4.id="btnKraj";
      dugme4.innerHTML="Kraj";
      navContainer.appendChild(dugme4);
      fromEvent(dugme4,'click')
      .subscribe(event =>{
         this._router.navigateToClosingPage();
      })

      this.rootContainer.appendChild(navContainer);
      this._mainPage.drawMainView();
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

         let tableObserver=this._mainPage._behaviorSinger.subscribe( value => {
            if(value==="Dobrodosli!" || value==="Orkestar se štimuje")
               htmlSto.innerHTML='';
            else{
               htmlSto.innerHTML=`${value}`;
            }
          }
         )
         let sto=new Gost(idStola,tableObserver);
         sto.changeAvailability(true);
         htmlSto.zauzet=true;
         this.gosti.addEl(sto);
         htmlSto.style.backgroundColor='rgb(222, 145, 135)';
         console.log(this.gosti.niz);
      }
      else return;
   }

   deleteGuest(){
      if(this.gosti.niz.length===0)
         alert("Kafana je prazna, nema gostiju!");
      else {

         let ispraznjeniSto=this.gosti.deleteEl();

         let htmlSto=document.getElementById(ispraznjeniSto.id);
         htmlSto.zauzet=false;
         htmlSto.style.backgroundColor='rgb(86, 160, 160)';
         htmlSto.innerHTML="";

         ispraznjeniSto.changeAvailability(false);
         ispraznjeniSto.cancelSubscription();

         console.log(this.gosti.niz);
      }
   }
}
