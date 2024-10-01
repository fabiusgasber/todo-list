import { domLoader } from "./dom-handler";

export const domCreator = (() => {

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

    const createTodoHTMLObj = (elem) => {
        const htmlObj = {
            "title": createTextContent("h1", elem.getTitle()),
            "description": createTextContent("p", elem.getDescription()),
            "dueDate": createDateInput(elem.getDate().toString()),
        }
        return htmlObj;
    }

    const createTodoContainer = (obj) => {
        const todoDiv = document.createElement("div");
        for(const property in obj){
            todoDiv.append(obj[property]);
        }
        return todoDiv;
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

    return { createForm, createTodoHTMLObj, createTodoContainer }
})();