import { domLoader } from "./dom-handler";
import { Navigation, PageAll, PageImportant, PageToday, PageWeek } from "./navigation";

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
    const navigation = {
        "all": new Navigation(new PageAll()),
        "today": new Navigation(new PageToday()),
        "week": new Navigation(new PageWeek()),
        "important": new Navigation(new PageImportant()),
    }
    const page = navigation[currentTab];
    if(page){
        page.navigateTo();
    }
}

init();