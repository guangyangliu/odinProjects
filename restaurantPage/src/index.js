import { pageLoad } from "./page-load";
import { menuLoad } from "./menu-load";
import { contactLoad } from "./contact-load";
import { clickAndLoad } from "./reloadContent";
import './style.css';

pageLoad();
clickAndLoad('home', pageLoad);
clickAndLoad('menu',menuLoad);
clickAndLoad('contact',contactLoad);