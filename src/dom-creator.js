import { Priority } from "./priorities";
import { defaultProject } from "./projects";

export const domCreator = (() => {

    const createElement = (tagName, text, attributes) => {
        const element = document.createElement(tagName);
        if(!element){
            console.warn(`Wrong tag name. Element could not be created ${tagName}.`);
        }
        else {
            element.textContent = text;
            for(const prop in attributes){
                element.setAttribute(prop, attributes[prop]);
            }    
            return element;    
        }
    }

    const createSelect = (name, id, selectOptions, option = "") => {
        const select = createElement("select");
        select.id = id;
        select.name = name;
        createOptions(select, selectOptions);
        if (option != "") select.value = option;
        return select;
    }

    const createOptions = (select, options = []) => {
        options.forEach(option => {
            const optionElem = createElement("option", option);
            optionElem.value = option;
            select.appendChild(optionElem);
         });
    }

    const createTodoContainer = (elem, obj) => {
        const container = document.createElement(elem);
        for(const property in obj){
            container.append(obj[property]);
        }
        return container;
    } 

    const createFormHTMLObj = () => {
        const formHTMLObj = {
            todoForm: {
                "title": createElement("input", "", { name: "title", class: "title", placeholder: "Title", id: "title"}),
                "description": createElement("input", "", { name: "description", class: "description", placeholder: "Description", id: "description" }),
                "date": createElement("input", "", { name: "date", class: "date", type: "date", id: "date" }),
                "priorities": createSelect("priorities", "priority-select", Priority.acceptedLevels),
                "projects": createSelect("projects", "projects-select", defaultProject.getProjects()),
                "submitBtn": createElement("button", "Submit", { type: "button", class: "submit-btn" }),
                "cancelBtn": createElement("button", "Cancel", { type: "button", class: "cancel-btn" }),
            },
            projectForm: {
                "name": createElement("input", "", { type: "text", placeholder: "Enter your projects name..." }),
                "submitBtn": createElement("button", "Submit", { type: "button", class: "submit-btn" }),
                "cancelBtn": createElement("button", "Cancel", { type: "button", class: "cancel-btn" }),
            }
        }         
        return formHTMLObj;
    }

    return { createFormHTMLObj, createTodoContainer, createElement }
})();