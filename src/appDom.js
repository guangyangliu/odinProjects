import { addTodo } from ".";
import { cancleTodo } from "./applogic";

export function createElement(parent, type = 'div', id = '', className = '') {
    let element = document.createElement(type);
    if(id) {
        element.id = id;
    }
    if (className) {
        element.classList.add(className);
    }
    parent.appendChild(element);
    return element;
}
