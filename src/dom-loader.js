import { createTodo } from "./todo-items";
import { project } from "./projects";
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
        if(element && typeof element.remove === "function"){
            element.remove();
        }
        else {
            console.warn(`${element} not found or does not contain remove function...`);
        }
    }

    const resetElement = (element) => {
        if(element && typeof element.reset === "function"){
            element.reset();
        }
        else {
            console.warn(`${element} not found or does not contain reset function...`);
        }
    }
    
    const loadProjects = (arr) => {
        const main = getQuery("#content");
        main ? main.replaceChildren() : "";
        if (arr.length > 0) {
            arr.forEach(elem => {
                const todoHTMLObj = domCreator.createTodoHTMLObj(elem);
                const todoDiv = domCreator.createTodoContainer("div", todoHTMLObj);
                appendChildToParent(todoDiv, main);
            });
        }
        else {
            return;
        }
    }

    const submitForm = () => {
        const form = getQuery("#todo-form");
        const title = getQuery('#title', form);
        const description = getQuery('#description', form);
        const date = getQuery('#date', form);
        const priority = getQuery("select", form);
        project.addTodo(createTodo(title.value, description.value, date.value, priority.value));
        removeForm();
        loadProjects(project.getTodos());
        getQuery("#addTodo").disabled = false;
    }
    
    return { getQuery, removeElement, resetElement, loadProjects, appendChildToParent, submitForm }
})();