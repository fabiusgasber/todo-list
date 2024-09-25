import { createTodo } from "./todo-items";
import { project } from "./projects";

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
        const form = domCreator.createForm();
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
        const todoContainers = arr.map(elem => domCreator.createTodoContainer(elem));
        todoContainers.forEach(container => main.append(container));
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


const domCreator = (() => {

    const createInput = (type, name, id) => {
        const input = document.createElement("input");
        type ? input.type = type : "";
        name ? input.name = name : "";
        id ? input.id = id : "";
        return input;
    }
        
    const createButton = (type, textContent, id) => {
        const btn = document.createElement("button");
        type ? btn.type = type : "";
        id ? btn.id = id : "";
        textContent ? btn.textContent = textContent : "";
        return btn;
    }

    const createTextContent = (tagName, text = "", labelFor) => {
        const elem = document.createElement(tagName);
        if(!elem){
            console.warn(`Element tag name not valid ${tagName}`);
        }
        elem.textContent = text;
        labelFor ? elem.for = labelFor : "";
        return elem;
    }

    const createDateInput = (dateStr = "") => {
        const date = createInput("date");
        date.value = dateStr;
        return date;
    }

    const createTodoContainer = () => {
        const container = document.createElement("div");
        container.classList.add("todo-container");
    
        const title = createTextContent("h1");
    
        const description = createTextContent("p");
    
        const dueDate = createDateInput();
    
        container.append(title, description, dueDate);
    
        return container;
    }
    
    const createForm = () => {
        const formIsVisible = domLoader.getQuery("#todo-form");
        if(formIsVisible){
            return;
        }
        else {
            const form = document.createElement("form");
            form.id = "todo-form";
        
            const titleLabel = createTextContent("label", "Title", "title");
            const title = createInput("text", "title", "title");
        
            const descriptionLabel = createTextContent("label", "Description (optional)", "label");
            const description = createInput("text", "description", "description");
    
            const dateLabel = createTextContent("label", "Due Date", "date");
            const date = createInput("date", "date", "date");
        
            const submitBtn = createButton("button", "Submit", "submit-btn");        
            const cancelBtn = createButton("button", "Cancel", "cancel-btn");    
        
            form.append(titleLabel, title, descriptionLabel, description, dateLabel, date, submitBtn, cancelBtn);
            return form;
        }
    }

    return { createTodoContainer, createForm }
})();