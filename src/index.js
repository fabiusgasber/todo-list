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

}

const handleClick = (e, obj) => {
    const identifier = e.target.id || e.target.className;
    const element = obj[identifier];
    if(element && typeof element.execute === "function"){
        element.execute(e);
    }
}

init();