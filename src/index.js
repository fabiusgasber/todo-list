import { domLoader } from "./dom-handler";
import { project } from "./projects";

function init() {
    setUpListeners();
}

function setUpListeners() {

    const button = document.querySelector("#addTodo");
    button.addEventListener("click", domLoader.initForm);

    const defaultProjects = Array.from(document.querySelectorAll("li"));
    defaultProjects.forEach(project => project.addEventListener("click", tabSwitch));  

}

function tabSwitch(e) {
    const currentTab = e.target.id;
    switch(currentTab) {
        case "all":
            domLoader.loadProjects(project.getTodos());
            break;
        case "today":
            domLoader.loadProjects(project.getToday());
            break;
        case "week":
            domLoader.loadProjects(project.getWeek());
            break;
        case "important":
            domLoader.loadProjects(project.getImportant());
            break;
    }
}

init();