import { resetContent } from "./reloadContent";

export function contactLoad() {
    let contentOfRestaurant = resetContent();
    let contactContainer = document.createElement('div');
    let address = document.createElement('h1');
    let tel = document.createElement('h1');
    let openAndCloseTime = document.createElement('h1');
    address.textContent = 'Adress: Thailand';
    tel.textContent = 'Tel: 17688888888';
    openAndCloseTime.textContent = 'Open time: 12:00 - 24:00'
    contactContainer.appendChild(address);
    contactContainer.appendChild(tel);
    contactContainer.appendChild(openAndCloseTime);
    contentOfRestaurant.appendChild(contactContainer);
}