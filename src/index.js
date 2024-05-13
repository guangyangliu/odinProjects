import './style.css';
import { createElement } from './appDom';
import { createProject, createTodo, cancleTodo } from './applogic';

//todoContainer
export const body = document.querySelector('body');
export const navContainer = document.getElementById('nav');
export const contentContainer = document.getElementById('content');
export const allContainer = document.getElementById('allTodos');

//add todo
export const add = document.getElementById('add');
add.addEventListener('click', ()=>{createTodo()});

//projects
export const projectContainer = document.getElementById('projects');






