import { resetContent } from "./reloadContent";
import food from "./food.jpg";

export function menuLoad() {
    let contentOfRestaurant = resetContent();
    let name = document.createElement('h1');
    let image = new Image();
    name.textContent = 'spicy noodel: 100 baht';
    image.src = food;
    contentOfRestaurant.appendChild(name);
    contentOfRestaurant.appendChild(image);
}