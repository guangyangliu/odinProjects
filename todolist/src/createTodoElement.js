const { createElement } = require("./createElement");
const _ = require('lodash');

import 'date-fns/locale';
import { format } from 'date-fns';
import { el, zhCN } from 'date-fns/locale';
import {  currentProjectId } from ".";
import { createTodo, deleteTodo } from './createTodoData';




export function addTodoEventListener() {
    const addTodo = document.getElementById('addTodo');
    addTodo.addEventListener('click', ()=>{
        const contentContainer = document.getElementById('content');
        createForm(contentContainer)});
}



function createForm(formContainer, todo = {project : '', title : '', description : '', dueDate : '', priority : '', time : ''}) {
    if (document.querySelector('form')) {
        return;
    }
    let todoForm = createElement(formContainer, 'form');
    let title = createElement(todoForm, 'input');
    title.type = 'text';
    title.placeholder = 'Assignment name';
    title.name = 'title';
    title.required = true;
    title.value = todo.title;

    let description = createElement(todoForm, 'input');
    description.type = 'text';
    description.placeholder = 'Description'
    description.name = 'description';
    description.required = true;
    description.value = todo.description;

    let dueDate = createElement(todoForm, 'input');
    dueDate.type = 'date';
    dueDate.name = 'dueDate';
    dueDate.required = true;
    dueDate.value = todo.dueDate;


    let priority = createElement(todoForm, 'select');
    priority.name = 'priority';
    createElement(priority, 'option').textContent = 'p0';
    createElement(priority, 'option').textContent = 'p1';
    createElement(priority, 'option').textContent = 'p2';
    createElement(priority, 'option').textContent = 'p3';
    createElement(priority, 'option').textContent = 'p4';
    priority.required = true;
    priority.value = todo.priority;


    let submit = createElement(todoForm, 'input');
    submit.type = 'submit';
    submit.value = 'Submit';

    todoForm.addEventListener('submit', (event)=>{
        if (!_.isEqual(todo, {project : '', title : '', description : '', dueDate : '', priority : '', time : ''})) {
            deleteTodo(todo);
        }
        storeForm(event);
        todoForm.remove();
        showTodo();
        
    });
    
    let cancle = createElement(todoForm, 'button');
    cancle.textContent = 'Cancle';
    cancle.id = 'cancle';
    cancle.addEventListener('click', ()=>{
        todoForm.remove();
        showTodo();
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

    let editButton = createElement(todoElement, 'button', 'editButton');
    editButton.textContent = 'edit';

    editButton.addEventListener('click', ()=>{
        todoElement.remove();
        createForm(contentContainer, todo);
    })

    //deleteTodo
    let deleteButton = createElement(todoElement, 'button', 'deleteButton');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', ()=>{
        todoElement.remove();
        deleteTodo(todo);
        showTodo();
    })
}


export function showAllprojects() {
    for (let i = 0; i < localStorage.length; i++) {
        showProject(localStorage.key(i));
    }
}


