import {fromEvent} from 'rxjs'
import {Router} from '../../router/router'
import {Gosti} from '../../models/gosti'
import {Gost} from '../../models/gost'
import {MainPage} from './main-page'
import '../../css/navigation-bar.css';


export class NavigationBar{
  
   rootContainer:HTMLDivElement;
   _router:Router;
   _mainPage:MainPage;

   constructor(){
      this.rootContainer=document.getElementById("main") as HTMLDivElement;
      this._router=new Router();
      this._mainPage=new MainPage();
   }
   
   drawNavigation(){
     
      let prethodni:HTMLDivElement=document.getElementById("main-content") as HTMLDivElement;
      prethodni.innerHTML="";

      let navContainer:HTMLDivElement=document.getElementById("navigation-bar") as HTMLDivElement;
      navContainer.className="navContainer";

      const logo:HTMLLabelElement=document.createElement("label");
      logo.className="logo";
      logo.innerHTML="Boemska";
      navContainer.appendChild(logo);

      const dugme1:HTMLButtonElement=document.createElement("button");
      dugme1.className="dugme";
      dugme1.id="btnDodajGosta";
      dugme1.innerHTML="Dodaj gosta";
      navContainer.appendChild(dugme1);
      this.addGuestButtonClick(dugme1);

      const dugme2:HTMLButtonElement=document.createElement("button");
      dugme2.className="dugme";
      dugme2.id="btnIzbaciGosta";
      dugme2.innerHTML="Izbaci gosta";
      navContainer.appendChild(dugme2);
      fromEvent(dugme2,'click')
      .subscribe(event =>{
         this.deleteGuest();
      })

      const dugme3:HTMLButtonElement=document.createElement("button");
      dugme3.className="dugme";
      dugme3.id="btnZaustavi";
      dugme3.innerHTML="Zaustavi";
      navContainer.appendChild(dugme3);

      const dugme4:HTMLButtonElement=document.createElement("button");
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

   addGuestButtonClick(btn:HTMLButtonElement){
      fromEvent(btn,'click')
      .subscribe(event =>{
         if(this._mainPage._gosti.areThereAvailableTables()){
            let idStola:string=(Math.floor((Math.random()*6 + 1))).toString();
            this.addGuestIfAvailable(idStola);
         }
         else alert("Zao nam je, nema vise slobodnih stolova!");
      })
   }

   addGuestIfAvailable(idStola:string)
   {
      let htmlSto:HTMLDivElement=document.getElementById(idStola) as HTMLDivElement;
      if(this._mainPage._gosti.checkIfAvailable(idStola)===true){

         let tableObserver=this._mainPage._behaviorSinger.subscribe( (value:string) => {
            if(value==="Dobrodošli!" || value==="Orkestar se štimuje")
               htmlSto.innerHTML='';
            else{
               htmlSto.innerHTML=`${value}`;
            }
          }
         )
         let sto=new Gost(idStola,tableObserver);
         sto.changeAvailability(true);
         this._mainPage._gosti.addEl(sto);
         htmlSto.style.backgroundColor='rgb(222, 145, 135)';
         console.log(this._mainPage._gosti.niz);
      }
      else return;
   }

   deleteGuest(){
      if(this._mainPage._gosti.niz.length===0)
         alert("Kafana je prazna, nema gostiju!");
      else {

         let ispraznjeniSto=this._mainPage._gosti.deleteEl();
         if(ispraznjeniSto){
            let htmlSto=document.getElementById(ispraznjeniSto.id) as HTMLDivElement;
            htmlSto.style.backgroundColor='rgb(86, 160, 160)';
            htmlSto.innerHTML="";

            ispraznjeniSto.changeAvailability(false);
            ispraznjeniSto.cancelSubscription();
         }
         console.log(this._mainPage._gosti.niz);
      }
   }
}
