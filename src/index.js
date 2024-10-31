import { ButtonHandler, ChangeItemAction, ChangeTextAction } from "./button-handler";
import { domLoader } from "./dom-loader";
import { logicHandler } from "./logic-handler";
import "./styles.css"

function init() {
    setUpListeners();
}

const setUpListeners = () => {

    const body = domLoader.getQuery("body");
    body.addEventListener("click", (e) => handleClick(e, logicHandler.getLogicObject()?.buttonAction ));

    const defaultProjects = Array.from(document.querySelectorAll("li"));
    defaultProjects.forEach(project => project.addEventListener("click", (e) => handleClick(e, logicHandler.getLogicObject()?.navigation)));  

    const main = document.querySelector("#main");
    main.addEventListener("input", (e) => new ButtonHandler(new ChangeItemAction()).execute(e));

    main.addEventListener("click", (e) => new ButtonHandler(new ChangeTextAction()).execute(e));

    const projectContainer = domLoader.getQuery("#projects");
    projectContainer.addEventListener("click", (e) => new ButtonHandler(new ChangeTextAction()).execute(e));
}

const handleClick = (e, obj) => {
    const identifier = e.target.id || e.target.className;
    const element = obj[identifier];
    if(element && typeof element.execute === "function"){
        element.execute(e);
    }
}

init();