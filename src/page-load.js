import restaurantImg from './restaurant.jpg';
import { resetContent } from './reloadContent';

export function pageLoad() {
    let contentOfRestaurant = resetContent();
    let headerOfRestaurant = document.createElement('h1');
    let imgOfRestaurant = new Image();
    let introOfRestaurant = document.createElement('p');
    headerOfRestaurant.textContent = 'Street Restaurant';
    imgOfRestaurant.src = restaurantImg;
    introOfRestaurant.textContent = 'A famous restaurant providing spicy noodels in Bangkok.';
    contentOfRestaurant.appendChild(headerOfRestaurant);
    contentOfRestaurant.appendChild(introOfRestaurant);
    contentOfRestaurant.appendChild(imgOfRestaurant);
};