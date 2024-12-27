import './style.css';
import { addProjectEventListener, showAllprojects } from './createProjectElement';
import { addTodoEventListener } from './createTodoElement';
import { createProjectElement } from './createProjectElement';
import { showTodo } from './createTodoElement';
//todoContainer
export const body = document.querySelector('body');
export const localStorage = window.localStorage;
export let currentProjectId = 'allTodos';


function app() {
setDefaultProject();
chooseProjectEventListener();
addProjectEventListener();
showAllprojects();
showTodo();
addTodoEventListener();
}


function setDefaultProject() {
    if(!localStorage.getItem('allTodos')) {
        localStorage.setItem('allTodos', JSON.stringify([]));
    }
}

function chooseProjectEventListener() {
    const navContainer = document.getElementById('nav');
    navContainer.addEventListener('click', (event)=>{
        let target = event.target;
        if(target && target.classList.contains('projectItem')) {
            changeCurrentProjectId(target.id);
            showTodo();
            
        }   
        })
}

export function changeCurrentProjectId(newCurrentProjectId) {
    let beforeProjectId = currentProjectId;
    document.getElementById(beforeProjectId).style.backgroundColor = 'white';
    currentProjectId = newCurrentProjectId;
}


app();
