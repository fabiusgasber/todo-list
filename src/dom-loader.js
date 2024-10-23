import { createTodo } from "./todo-items";
import { createProject, defaultProject } from "./projects";
import { processor } from "./processor";
import { domCreator } from "./dom-creator";

export const domLoader = (() => {

    const getQuery = (selector, elem = document) => {
        const element = elem.querySelector(selector);
        if(!element) {
            return console.error(`Element not found: ${selector}`);
        }
        return element;
    }

    const appendChildToParent = (child, parent) => {
       return parent.append(child);
    }

    const removeElement = (element) => {
        if(element && typeof element.remove === "function" && typeof element.reset === "function"){
            element.remove();
            element.reset();
        }
        else if (element && typeof element.remove === "function") {
            element.remove();
        }
        else {
            console.warn(`${element} not found or does not contain remove function...`);
        }
    }
    
    const submitProject = (form) => {  
        const ul = getQuery("#ownProjects")
        const textInput = Array.from(form.children).find(element => element.tagName === "INPUT");
        const userProject = createProject(textInput.value);
        defaultProject.addProject(userProject);
        const li = domCreator.createProjectListItem(userProject.getTitle());
        li.addEventListener("click", () => {
            const main = getQuery("#content");
            main.replaceChildren();
            const todoDivs = domCreator.createTodoDivs(userProject.getTodos(), userProject);
            todoDivs.forEach(todoDiv => appendChildToParent(todoDiv, main));
        });
        appendChildToParent(li, ul);
    }
    
    const submitForm = (form) => {
        let inputArr = [];
        let parsedInputs = [];
        if(form && processor.checkArray(form.children)){
            inputArr = Array.from(form.children).filter(element => element.tagName === "SELECT" || element.tagName === "INPUT").map(input => ({ type: input.type, value: input.value, id: input.id }));
        }
        if(processor.checkArray(inputArr)){
            parsedInputs = processor.parseInput(inputArr);
        }
        if(processor.checkArray(parsedInputs)){
            const todo = createTodo(parsedInputs);
            defaultProject.allTasks.addTodo(todo);
            if (todo.getProject() && todo.getProject() !== defaultProject.allTasks){
                todo.getProject().addTodo(todo);
            }
        }
    }
    
    return { getQuery, removeElement, appendChildToParent, submitForm, submitProject }
})();