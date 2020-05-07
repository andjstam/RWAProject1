import {MainPage} from "./Pages/main-page.js";
import {NavigationBar} from "./Navigation/navigation-bar";
import '../css/background.css'

let nav=new NavigationBar();
nav.drawNavigation();

let glavna=new MainPage();
glavna.drawMainView();

