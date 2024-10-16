import { domCreator } from "./dom-creator";
import { domLoader } from "./dom-loader";
import { logicHandler } from "./logic-handler";

function init() {
    setUpListeners();
}

const main = domLoader.getQuery("#content");
const formObj = domCreator.createFormHTMLObj();
const form = domCreator.createTodoContainer("form", formObj);
form.id = "todo-form";

const setUpListeners = () => {

    const button = document.querySelector("#addTodo");
    button.addEventListener("click", () => domLoader.appendChildToParent(form, main));

    form.addEventListener("click", (e) => handleClick(e, logicHandler.getLogicObject()?.buttonAction));

    const defaultProjects = Array.from(document.querySelectorAll("li"));
    defaultProjects.forEach(project => project.addEventListener("click", (e) => handleClick(e, logicHandler.getLogicObject()?.navigation)));  

}

const handleClick = (e, obj) => {
    const className = e.target.className;
    const element = obj[className];
    if(element && typeof element.execute === "function"){
        element.execute(e);
    }
}

init();