import {NavigationBar} from "../src/Pages/navigation-bar"
import { ClosingPage } from "../src/Pages/closing-page.js";

export class Router{

    constructor(){
    }

    navigateToMainPage(){
        let glavnaStranica=new NavigationBar();
        glavnaStranica.drawNavigation();
    }

    navigateToClosingPage(){
        let zavrsnaStranica=new ClosingPage();
        zavrsnaStranica.drawClosingPage();
    }



}
