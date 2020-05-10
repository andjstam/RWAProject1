import {MainPage} from "../src/Pages/main-page.js";

export class Router{

    constructor(){
    }

    navigateToMainPage(){
        let glavnaStranica=new MainPage();
        glavnaStranica.drawMainView();
    }



}
