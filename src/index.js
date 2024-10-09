import { domLoader } from "./dom-loader";
import { Navigation, PageAll, PageImportant, PageToday, PageWeek } from "./navigation";

function init() {
    setUpListeners();
}
const navigation = {
    "all": new Navigation(new PageAll()),
    "today": new Navigation(new PageToday()),
    "week": new Navigation(new PageWeek()),
    "important": new Navigation(new PageImportant()),
}

function setUpListeners() {

    const button = document.querySelector("#addTodo");
    button.addEventListener("click", () => domLoader.appendChildToParent(form, main));

    const defaultProjects = Array.from(document.querySelectorAll("li"));
    defaultProjects.forEach(project => project.addEventListener("click", (e) => tabSwitch(e, navigation)));  

}

function tabSwitch(e, obj) {
    const currentTab = e.target.id;
    const page = obj[currentTab];
    if(page){
        page.navigateTo();
    }
}

init();