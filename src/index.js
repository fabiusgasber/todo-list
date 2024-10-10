import { ButtonHandler, FormCancelAction, FormSubmitAction } from "./button-handler";
import { domCreator } from "./dom-creator";
import { domLoader } from "./dom-loader";
import { Navigation, PageAll, PageImportant, PageToday, PageWeek } from "./navigation";

function init() {
    setUpListeners();
}

const main = domLoader.getQuery("#content");
const formObj = domCreator.createFormHTMLObj();
const form = domCreator.createTodoContainer("form", formObj);
form.id = "todo-form";

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

    form.addEventListener("click", (e) => handleClick(e, logicHandler.buttonAction));

    const defaultProjects = Array.from(document.querySelectorAll("li"));
    defaultProjects.forEach(project => project.addEventListener("click", (e) => handleClick(e, logicHandler.navigation)));  

}

function handleClick(e, obj) {
    const id = e.target.id;
    const element = obj[id];
    if(element && typeof element.execute() === "function"){
        element.execute();
    }
}

init();