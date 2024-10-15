import { createTodo } from "./todo-items";
import { project } from "./projects";
import { processor } from "./processor";

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
    
    const submitForm = (form) => {
        const inputArr = Array.from(form.children).filter(element => element.tagName === "SELECT" || element.tagName === "INPUT").map(input => ({ type: input.type, value: input.value }));
        const parsedInputs = processor.parseInput(inputArr);
        project.addTodo(createTodo(parsedInputs));
    }
    
    return { getQuery, removeElement, appendChildToParent, submitForm }
})();