import {NavigationBar} from "../src/Pages/navigation-bar"
import { ClosingPage } from "../src/Pages/closing-page";

export class Router{

    constructor(){
    }

    navigateToMainPage(){
        let mainPage: NavigationBar=new NavigationBar();
        mainPage.drawNavigation();
    }

    navigateToClosingPage(){
        let closingPage:ClosingPage=new ClosingPage();
        closingPage.drawClosingPage();
    }



}
