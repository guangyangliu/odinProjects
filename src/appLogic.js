const { createElement } = require("./appDom");
import 'date-fns/locale'; 

import { projectContainer, contentContainer } from ".";



export function createProject(projectName) {
    let project = createElement(projectContainer, 'div', projectName);
    project.textContent = projectName;
}


export function createTodo() { 
    let todoContainer = createElement(contentContainer, 'form', 'todo', 'todo');
    let title = createElement(todoContainer, 'input');
    title.type = 'text';
    title.placeholder = 'Assignment name';
    
    title.name = 'title';

    let description = createElement(todoContainer, 'input');
    description.type = 'text';
    description.placeholder = 'Description'
    
    description.name = 'description';

    let dueDate = createElement(todoContainer, 'input');
    dueDate.type = 'date';
    
    dueDate.name = 'dueDate';

    let priority = createElement(todoContainer, 'select');
    createElement(priority, 'option').textContent = 'p0';
    createElement(priority, 'option').textContent = 'p1';
    createElement(priority, 'option').textContent = 'p2';
    createElement(priority, 'option').textContent = 'p3';
    createElement(priority, 'option').textContent = 'p4';
    priority.required = true;

    let submit = createElement(todoContainer, 'button');
    submit.type = 'submit';
    submit.textContent = 'Submit';

    let cancle = createElement(todoContainer, 'button');
    cancle.addEventListener('click', ()=>{cancleTodo()});
    cancle.textContent = 'Cancle';
    cancle.id = 'cancle';
    return todoContainer;
}


export function cancleTodo() {
    let todo = document.getElementById('todo');
    todo.remove();
}

