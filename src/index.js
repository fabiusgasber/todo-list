

function init() {
    setUpListeners();
    loadProjects(getAllTasks());
}

function setUpListeners() {

    const button = document.querySelector("#addTodo");
    button.addEventListener("click", initForm);

    const defaultProjects = Array.from(document.querySelectorAll("li"));
    defaultProjects.forEach(project => project.addEventListener("click", tabSwitch));  

}

