export function createTodo(project, title, description, dueDate, priority, time) {
    const projectItem = localStorage.getItem(project);
    if(projectItem) {
        const todoListOfProject = JSON.parse(projectItem);
        const todo = {title, description, dueDate, priority, time};
        todoListOfProject.push(todo);
        localStorage.setItem(project, JSON.stringify(todoListOfProject));
    }
}