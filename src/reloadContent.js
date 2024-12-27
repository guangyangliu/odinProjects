export function resetContent() {
    let contentOfRestaurant = document.getElementById('content');
    contentOfRestaurant.remove();
    contentOfRestaurant = document.createElement('div');
    contentOfRestaurant.id = 'content';
    let body = document.querySelector('body');
    body.appendChild(contentOfRestaurant);
    return contentOfRestaurant;
}

export function clickAndLoad(buttonId, loadFunction) {
    let menu = document.getElementById(buttonId);
    menu.addEventListener('click', ()=>{
        loadFunction();
    });
}