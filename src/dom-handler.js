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
        
    const initForm = () => {
        const main = getQuery("#content");
        const formObj = domCreator.createFormHTMLObj();
        const form = domCreator.createTodoContainer("form", formObj);
        attachFormListeners(form, "#submit-btn", "#cancel-btn", submitForm, removeForm);
        appendChildToParent(form, main);
    }

    const appendChildToParent = (child, parent) => {
       return parent.append(child);
    }

    const attachFormListeners = (form, submitSelector, cancelSelector, submitCallback, cancelCallback) => {
        const submitElem = getQuery(submitSelector, form);
        const cancelElem = getQuery(cancelSelector, form);
        if(submitElem && cancelElem) {
            submitElem.addEventListener("click", submitCallback);
            cancelElem.addEventListener("click", cancelCallback);
        }
        else {
            console.error("Buttons for event not found.")
        }
    }

    const removeForm = () => {
        const formIsVisible = getQuery("#todo-form")
        formIsVisible ? formIsVisible.remove() : console.warn("To do form not found");
    }
    
    const loadProjects = (arr) => {
        const main = getQuery("#content");
        main ? main.replaceChildren() : "";
        if (arr.length > 0) {
            arr.forEach(elem => {
                const todoHTMLObj = domCreator.createTodoHTMLObj(elem);
                const todoDiv = domCreator.createTodoContainer(todoHTMLObj);
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
        project.addTodo(createTodo(title.value, description.value, date.value));
        removeForm();
        loadProjects(project.getTodos());
    }
    
    return { getQuery, initForm, removeForm, loadProjects }
})();