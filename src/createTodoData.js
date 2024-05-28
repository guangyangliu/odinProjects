export function createTodo(project, title, description, dueDate, priority, time) {
    const projectItem = localStorage.getItem(project);
    if(projectItem) {
        const todoListOfProject = JSON.parse(projectItem);
        const todo = {project, title, description, dueDate, priority, time};
        todoListOfProject.push(todo);
        localStorage.setItem(project, JSON.stringify(todoListOfProject));
    }
}

export function deleteTodo(project, todo) {
    const projectItem = localStorage.getItem(project);
    if(projectItem) {
        const todoListOfProject = JSON.parse(projectItem);
        
        todoListOfProject.
        localStorage.setItem(project, JSON.stringify(todoListOfProject));
    }
}