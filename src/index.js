import { initForm, loadProjects } from "./dom-handler";
import { project } from "./projects";

function init() {
    setUpListeners();
}

function setUpListeners() {

    const button = document.querySelector("#addTodo");
    button.addEventListener("click", initForm);

    const defaultProjects = Array.from(document.querySelectorAll("li"));
    defaultProjects.forEach(project => project.addEventListener("click", tabSwitch));  

}

function tabSwitch(e) {
    const currentTab = e.target.id;
    switch(currentTab) {
        case "all":
            loadProjects(project.getTodos());
            break;
        case "today":
            loadProjects(project.getToday());
            break;
        case "week":
            loadProjects(project.getWeek());
            break;
        case "important":
            loadProjects(project.getImportant());
            break;
    }
}

init();