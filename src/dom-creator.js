import { Priority } from "./priorities";

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

    const createSelect = (name, id, option = "") => {
        const select = createElement("select");
        select.id = id;
        select.name = name;
        createOptions(select, Priority.acceptedLevels);
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
                "title": createElement("input", "", { name: "title", id: "title", placeholder: "Title"}),
                "description": createElement("input", "", { name: "description", id: "description", placeholder: "Description" }),
                "date": createElement("input", "", { name: "date", id: "date", type: "date" }),
                "priorities": createSelect("priorities", "priority-select"),
                "submitBtn": createElement("button", "Submit", { type: "button", id: "submit-btn" }),
                "cancelBtn": createElement("button", "Cancel", { type: "button", id: "cancel-btn" }),
        }         
        return formHTMLObj;
    }

    return { createFormHTMLObj, createTodoContainer, createElement }
})();