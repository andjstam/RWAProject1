import {NavigationBar} from "../src/Pages/navigation-bar"
import { ClosingPage } from "../src/Pages/closing-page";

export class Router{

    constructor(){
    }

    navigateToMainPage(){
        let glavnaStranica: NavigationBar=new NavigationBar();
        glavnaStranica.drawNavigation();
    }

    navigateToClosingPage(){
        let zavrsnaStranica:ClosingPage=new ClosingPage();
        zavrsnaStranica.drawClosingPage();
    }



}
