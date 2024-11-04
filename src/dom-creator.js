import { Priority } from "./priorities";

export const domCreator = (() => {

    const createElement = (tagName, text, attributes, selectOptions, optionValue) => {
        const element = document.createElement(tagName);
        if(!element){
            console.warn(`Wrong tag name. Element could not be created ${tagName}.`);
        }
        else {
            element.textContent = text;
            for(const prop in attributes){
                element.setAttribute(prop, attributes[prop]);
            }
            if(selectOptions && Array.isArray(selectOptions) && element.tagName === "SELECT"){
                selectOptions.forEach(option => {
                    const optionElem = createElement("option", option);
                    optionElem.value = option;
                    element.appendChild(optionElem);    
                })
            }
            if(optionValue){
                element.value = optionValue;
            }
            return element;    
        }
    }

    const createTodoDivs = (projectArr, project) => {
        const todoDivs = projectArr.map((todo) => {
            const div = createElement("div", "", { class: "todoDiv", todoID: `${ todo.uuID }`, projectID: `${ project.uuID }` } );
            const textContent = createElement("div", "", { class: "todo-text" });
            const title = todo.getTitle();
            textContent.append(title);
            const date = createElement("input", "", { type: "date", value: todo.getDate().toString()});
            const checker = createElement("div", "", { class: "checker" });
            const priorityDiv = createElement("div", "", { class: "select-wrapper" });
            const priority = createElement("select", "", { class: "priority-select" }, Priority.acceptedLevels, todo.getPriority().getLevel());
            priorityDiv.append(priority);
            const deleteDiv = createElement("div", "", { class: "delete-div" });
            div.append(checker, textContent, date, priorityDiv, deleteDiv);
            return div;
        });
        return todoDivs;
    }

    const createProjectListItem = (text, project) => {
        const li = createElement("li", "", { class: "project-li", projectID: `${ project.uuID }` });
        const p = createElement("p", text, { class: "projectTitle" });
        const deleteBtn = createElement("div", "", { class: "deleteProject-btn" });
        const buttonDiv = createElement("div", "", { class: "button-div" });
        buttonDiv.append(deleteBtn);
        li.append(p, buttonDiv);
        return li;
    } 

    const createForm = () => {
        const form = createElement("form");
        const name = createElement("input", "", { type: "text", placeholder: "Enter your name..." });
        const submitBtn = createElement("button", "Add", { type: "button", class: "form-submit-btn" });
        const cancelBtn = createElement("button", "Cancel", { type: "button", class: "form-cancel-btn" });
        const buttonDiv = createElement("div", "", { class: "button-div" });
        buttonDiv.append(submitBtn, cancelBtn);
        form.append(name, buttonDiv);
        return form;
    }

    return { createElement, createForm, createTodoDivs, createProjectListItem}
})();