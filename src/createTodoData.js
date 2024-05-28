export function createTodo(project, title, description, dueDate, priority, time) {
    const projectItem = localStorage.getItem(project);
    if(projectItem) {
        const todoListOfProject = JSON.parse(projectItem);
        const todo = {project, title, description, dueDate, priority, time};
        todoListOfProject.push(todo);
        localStorage.setItem(project, JSON.stringify(todoListOfProject));
    }
}

export function deleteTodo(todo) {
    let project = todo.project;
    let todoList = JSON.parse(localStorage.getItem(project));
    todoList = todoList.filter(todoObj => !_.isEqual(todoObj, todo));
    localStorage.setItem(project, JSON.stringify(todoList));
    return todoList;
}



