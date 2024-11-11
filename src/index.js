import { ButtonHandler, ChangeItemAction, ChangeTextAction } from "./button-handler";
import { domCreator } from "./dom-creator";
import { domLoader } from "./dom-loader";
import { logicHandler } from "./logic-handler";
import { defaultProject } from "./projects";
import "./styles.css"
import { userStorage } from "./user-storage";

function init() {
    let storedData = userStorage.getData("projects");
    let storedProject = storedData.find(data => data.title == "default");
    if(!storedProject) {
     storedData.push({title: defaultProject.allTasks.getTitle(), todos: defaultProject.allTasks.getTodos(), projectID: defaultProject.allTasks.uuID});
     userStorage.addData("projects", storedData);
    }
    setUpListeners();
}

const setUpListeners = () => {

    const body = domLoader.getQuery("body");
    body.addEventListener("click", (e) => handleClick(e, logicHandler.getLogicObject()?.buttonAction ));

    const nav = document.querySelector("nav");
    nav.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if(li){
          domLoader.getQuery("#main").replaceChildren();
          const projectID = li.getAttribute("projectid");
          domLoader.getQuery("#main").append(domCreator.createElement("h1", e.target.textContent, { id: "page-title", projectid: projectID}));
          if(projectID){
            const project = defaultProject.getProjects().find(project => project.uuID == projectID);
            const todoDivs = domCreator.createTodoDivs(project.getTodos(), project);
            todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));    
          }
          else if(li.getAttribute("id") === "all"){
            li.classList.add("active");
            const todoDivs = domCreator.createTodoDivs(defaultProject.allTasks.getTodos(), defaultProject.allTasks);
            todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));    
          }
          else if(li.getAttribute("id") === "today"){
            const todoDivs = domCreator.createTodoDivs(defaultProject.allTasks.getToday(), defaultProject.allTasks);
            todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));    
          }
          else if(li.getAttribute("id") === "week"){
            const todoDivs = domCreator.createTodoDivs(defaultProject.allTasks.getWeek(), defaultProject.allTasks);
            todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));    
          }
          else if(li.getAttribute("id") === "important"){
            const todoDivs = domCreator.createTodoDivs(defaultProject.allTasks.getImportant(), defaultProject.allTasks);
            todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));    
          }

        }
    });

    const main = document.querySelector("#main");
    main.addEventListener("input", (e) => new ButtonHandler(new ChangeItemAction()).execute(e));

    main.addEventListener("click", (e) => new ButtonHandler(new ChangeTextAction()).execute(e));

    const projectContainer = domLoader.getQuery("#projects");
    projectContainer.addEventListener("click", (e) => new ButtonHandler(new ChangeTextAction()).execute(e));
}

const handleClick = (e, obj) => {
    const identifier = e.target.id || e.target.classList;
    const element = obj[identifier];
    if(element && typeof element.execute === "function"){
        element.execute(e);
    }
}

init();