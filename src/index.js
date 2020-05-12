import {MainPage} from "./Pages/main-page.js";
import {NavigationBar} from "./Navigation/navigation-bar";
import '../css/background.css'

import {SongService} from "../services/song-service"

let nav=new NavigationBar();
nav.drawNavigation();

let glavna=new MainPage();
glavna.drawMainView();

let ser=new SongService();
ser.getSongByName("slike u oku")
    .subscribe(song =>
    console.log(song));