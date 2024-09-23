import { initForm, loadProjects } from "./dom-handler";
import { getAllTasks, loadToday, loadWeek } from "./projects";


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

function tabSwitch(e) {
    const currentTab = e.target.id;
    switch(currentTab) {
        case "all":
            loadProjects(getAllTasks());
            break;
        case "today":
            loadProjects(loadToday());
            break;
        case "week":
            loadProjects(loadWeek());
            break;
        case "important":
            loadImportant();
            break;
    }
}

init();