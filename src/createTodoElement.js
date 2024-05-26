const { createElement } = require("./createElement");
import 'date-fns/locale';
import { format } from 'date-fns';
import { el, zhCN } from 'date-fns/locale';
import {  currentProjectId } from ".";
import { createTodo } from './createTodoData';




export function addTodoEventListener() {
    const addTodo = document.getElementById('addTodo');
    addTodo.addEventListener('click', ()=>{createForm()});
}



function createForm() {
    if (document.querySelector('form')) {
        return;
    }
    const contentContainer = document.getElementById('content');
    let todoForm = createElement(contentContainer, 'form');
    let title = createElement(todoForm, 'input');
    title.type = 'text';
    title.placeholder = 'Assignment name';
    title.name = 'title';
    title.required = true;

    let description = createElement(todoForm, 'input');
    description.type = 'text';
    description.placeholder = 'Description'
    description.name = 'description';
    description.required = true;

    let dueDate = createElement(todoForm, 'input');
    dueDate.type = 'date';
    dueDate.name = 'dueDate';
    dueDate.required = true;


    let priority = createElement(todoForm, 'select');
    priority.name = 'priority';
    createElement(priority, 'option').textContent = 'p0';
    createElement(priority, 'option').textContent = 'p1';
    createElement(priority, 'option').textContent = 'p2';
    createElement(priority, 'option').textContent = 'p3';
    createElement(priority, 'option').textContent = 'p4';
    priority.required = true;

    let submit = createElement(todoForm, 'input');
    submit.type = 'submit';
    submit.value = 'Submit';

    todoForm.addEventListener('submit', (event)=>{
        storeForm(event);
        todoForm.remove();
        showTodo();
    });
    
    let cancle = createElement(todoForm, 'button');
    cancle.textContent = 'Cancle';
    cancle.id = 'cancle';
    cancle.addEventListener('click', ()=>{
        todoForm.remove();
    })
}


function storeForm(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const submitTime = new Date();
    const time = format(submitTime, 'yyyy-MM-dd-HH-mm-ss', { locale: zhCN });
    
    let formData = new FormData(event.target);
    
    // Retrieve form data
    const title = formData.get('title');
    const description = formData.get('description');
    const dueDate = formData.get('dueDate');
    const priority = formData.get('priority');


    // Store form data in local storage
    createTodo(currentProjectId, title, description, dueDate, priority, time);
}





export function showTodo() {
    clearChildren('content');
    document.getElementById(currentProjectId).style.backgroundColor = 'red';
    if (currentProjectId === 'allTodos') {
        for (let i = 0; i < localStorage.length; i++) {
            let projectId = localStorage.key(i);
            showTodoOfProject(projectId);
        }
    } else {
        showTodoOfProject(currentProjectId);
    }
    
    
}


function clearChildren(parentElementId) {
    const parentElement = document.getElementById(parentElementId);
    // Remove all child nodes
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}


function showTodoOfProject(projectId) {
    let projectItem = localStorage.getItem(projectId);
    if(projectItem) {
        let todoList = JSON.parse(projectItem);
        for (let i = 0; i < todoList.length; i++) {
            let todo = todoList[i];
            createTodoElement(todo);
        }
    }
}

function createTodoElement(todo) {
    const contentContainer = document.getElementById('content');
    let todoElement = createElement(contentContainer, 'div');
    let title = createElement(todoElement, 'div');
    title.textContent = todo.title;
    let description = createElement(todoElement, 'div');
    description.textContent = todo.description;
    let dueDate = createElement(todoElement, 'div');
    dueDate.textContent = todo.time;
}

export function showAllprojects() {
    for (let i = 0; i < localStorage.length; i++) {
        showProject(localStorage.key(i));
    }
}


