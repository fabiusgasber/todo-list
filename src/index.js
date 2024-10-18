import { domCreator } from "./dom-creator";
import { domLoader } from "./dom-loader";
import { logicHandler } from "./logic-handler";

function init() {
    setUpListeners();
}

const main = domLoader.getQuery("#content");

const setUpListeners = () => {

    const button = document.querySelector("#addTodo");
    button.addEventListener("click", () => {
        const formObj = domCreator.createFormHTMLObj().todoForm;
        const form = domCreator.createTodoContainer("form", formObj);
        form.id = "todo-form";
        form.addEventListener("click", (e) => handleClick(e, logicHandler.getLogicObject()?.buttonAction, { "submitFtn": domLoader.submitForm, "cancelFtn": domLoader.removeElement }));
        domLoader.appendChildToParent(form, main);
    });

    const addProjectBtn = document.querySelector("#addProject");
    addProjectBtn.addEventListener("click", () => {
        const projectFormObj = domCreator.createFormHTMLObj().projectForm;
        const projectForm = domCreator.createTodoContainer("form", projectFormObj);
        projectForm.addEventListener("click", (e) => handleClick(e, logicHandler.getLogicObject()?.buttonAction, { "submitFtn": domLoader.submitProject, "cancelFtn": domLoader.removeElement }));
        domLoader.appendChildToParent(projectForm, main);
    });

    const ownProjects = domLoader.getQuery("#ownProjects");
    ownProjects.addEventListener("click", (e) => handleClick(e, logicHandler.getLogicObject()?.buttonAction, { "cancelFtn": domLoader.removeElement }));

    const defaultProjects = Array.from(document.querySelectorAll("li"));
    defaultProjects.forEach(project => project.addEventListener("click", (e) => handleClick(e, logicHandler.getLogicObject()?.navigation)));  

}

const handleClick = (e, obj, options) => {
    const identifier = e.target.id || e.target.className;
    const element = obj[identifier];
    if(element && typeof element.execute === "function"){
        element.execute(e, options);
    }
}

init();