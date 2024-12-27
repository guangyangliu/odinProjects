export function createElement(parent, type = 'div', id = '', className = '') {
    let element = document.createElement(type);
    parent.appendChild(element);
    if (id) {
        element.id = id;
    }
    if (className) {

    element.classList.add(className);
        
    }
    return element;
}
