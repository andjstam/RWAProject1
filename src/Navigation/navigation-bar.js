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
    dugme1.innerHTML="Pocetak";
    navContainer.appendChild(dugme1);
    const dugme2=document.createElement("button");
    dugme2.className="dugme";
    dugme2.innerHTML="Dodaj gosta";
    navContainer.appendChild(dugme2);
    const dugme3=document.createElement("button");
    dugme3.className="dugme";
    dugme3.innerHTML="Kraj";
    navContainer.appendChild(dugme3);

    this.rootContainer.appendChild(navContainer);
   }
}
