export function createProject(projectName) {
    if (localStorage.getItem(projectName) === null) {
        localStorage.setItem(projectName, JSON.stringify([]));
    }
}




