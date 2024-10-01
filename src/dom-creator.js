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

    const createFormHTMLObj = () => {
        const formIsVisible = domLoader.getQuery("#todo-form");
        if(formIsVisible){
            return;
        }
        else {

            const formHTMLObj = {
                "titleLabel": createTextContent("label", "Title", "title"),
                "title": createInput("text", "title", "title"),
                "descriptionLabel": createTextContent("label", "Description (optional)", "label"),
                "description": createInput("text", "description", "description"),
                "dateLabel": createTextContent("label", "Due Date", "date"),
                "date": createInput("date", "date", "date"),
                "submitBtn": createButton("button", "Submit", "submit-btn"),
                "cancelBtn": createButton("button", "Cancel", "cancel-btn"),
            }         
            return formHTMLObj;
        }
    }

    return { createFormHTMLObj, createTodoHTMLObj, createTodoContainer }
})();