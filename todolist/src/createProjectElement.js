import { createElement } from "./createElement";
import { createProject } from "./createProject";
import { showTodo } from "./createTodoElement";
import { changeCurrentProjectId } from ".";

//addProject

export function addProjectEventListener() {
    const addProjectButton = document.getElementById('addProject');
    addProjectButton.addEventListener('click', ()=>{
    if (document.querySelector('form')) {
        return;}
    const contentContainer = document.getElementById('content')
    let projectForm = createElement(contentContainer, 'form', 'projectForm');
    let projectName = createElement(projectForm, 'input');
    projectName.type = 'text';
    projectName.placeholder = 'New Project Name'
    projectName.name = 'projectName';
    projectName.required = 'true';

    let submit = createElement(projectForm, 'input');
    submit.type = 'submit';
    submit.value = 'Submit';
    
    let cancle = createElement(projectForm, 'button');
    cancle.textContent = 'Cancle';
    cancle.id = 'cancle';


    projectForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        let formData = new FormData(event.target);
        let projectNameData = formData.get('projectName');
        createProject(projectNameData);
        showProject(projectNameData);
        projectForm.remove();

        changeCurrentProjectId(projectNameData);
        showTodo();
    });

    cancle.addEventListener('click', ()=>{
        projectForm.remove();
    })

})}


export function createProjectElement(projectName) {
    let projectLists = document.getElementById('projectLists');
    let project = createElement(projectLists, 'li', projectName, 'projectItem');
    project.textContent = projectName;
}

function showProject(projectName) {
    if(localStorage.getItem(projectName) !== null && document.getElementById(projectName) == null) { 
        createProjectElement(projectName);
    }
}

export function showAllprojects() {
    for (let i = 0; i < localStorage.length; i++) {
        showProject(localStorage.key(i));
    }
}



