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
        if (arr.length > 0 && main) {
        main.replaceChildren();
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
    
    const createLabel = (labelFor, textContent) => {
        const label = document.createElement("label");
        label.for = labelFor;
        label.textContent = textContent;
        return label;
    }
    
    const createButton = (type, textContent, id) => {
        const btn = document.createElement("button");
        type ? btn.type = type : "";
        id ? btn.id = id : "";
        textContent ? btn.textContent = textContent : "";
        return btn;
    }

    const createHeadline = (type, text) => {
        const headline = document.createElement(type);
        headline.textContent = text;
        return headline;
    }

    const createPara = (text) => {
        const para = document.createElement("p");
        para.textContent = text;
        return para;
    }

    const createDateInput = (dateStr) => {
        const date = createInput("date");
        date.value = dateStr ? dateStr : "";
        return date;
    }

    const createTodoContainer = (todo) => {
        const container = document.createElement("div");
        container.classList.add("todo-container");
    
        const title = createHeadline("h1", todo.getTitle());
    
        const description = createPara(todo.getDescription());
    
        const dueDate = createDateInput(todo.getDate().toString());
    
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
        
            const titleLabel = createLabel("title", "Title");
            const title = createInput("text", "title", "title");
        
            const descriptionLabel = createLabel("description", "Description (optional)");
            const description = createInput("text", "description", "description");
    
            const dateLabel = createLabel("date", "Due Date");
            const date = createInput("date", "date", "date");
        
            const submitBtn = createButton("button", "Submit", "submit-btn");        
            const cancelBtn = createButton("button", "Cancel", "cancel-btn");    
        
            form.append(titleLabel, title, descriptionLabel, description, dateLabel, date, submitBtn, cancelBtn);
            return form;
        }
    }

    return { createTodoContainer, createForm }
})();