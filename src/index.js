import {MainPage} from "./Pages/main-page.js";
import {NavigationBar} from "./Navigation/navigation-bar";
import '../css/background.css'
import { Subject} from 'rxjs'
import {takeUntil} from 'rxjs/operators'


let nav=new NavigationBar();
nav.drawNavigation();

let glavna=new MainPage();
 glavna.drawMainView();







