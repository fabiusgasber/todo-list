import { domLoader } from "./dom-loader";
import { Navigation, PageAll, PageImportant, PageToday, PageWeek } from "./navigation";

function init() {
    setUpListeners();
}
const logicHandler = {
    navigation: {
        "all": new Navigation(new PageAll()),
        "today": new Navigation(new PageToday()),
        "week": new Navigation(new PageWeek()),
        "important": new Navigation(new PageImportant()),
    },
    buttonAction: {
        "submit-btn": new ButtonHandler(new FormSubmitAction),
        "cancel-btn": new ButtonHandler(new FormCancelAction),
    },
}

function setUpListeners() {

    const button = document.querySelector("#addTodo");
    button.addEventListener("click", () => domLoader.appendChildToParent(form, main));

    const defaultProjects = Array.from(document.querySelectorAll("li"));
    defaultProjects.forEach(project => project.addEventListener("click", (e) => tabSwitch(e, navigation)));  

}

function handleClick(e, obj) {
    const id = e.target.id;
    const element = obj[id];
    if(element && typeof element.execute() === "function"){
        element.execute();
    }
}

init();