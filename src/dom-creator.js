import { Priority } from "./priorities";
import { defaultProject } from "./projects";

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
            const text = todo.getText().map(text => createElement("div", text));
            const date = createElement("div", todo.getDate().toString());
            const priority = createElement("div", todo.getPriority().getLevel());
            const editBtn = createElement("button", "Edit", { type: "submit", class: "editTodo-btn" });
            const deleteBtn = createElement("button", "Delete", { type: "submit", class: "deleteTodo-btn" });
            div.append(...text, date, priority, editBtn, deleteBtn);
            return div;
        });
        return todoDivs;
    }

    const createProjectListItem = (text) => {
        const li = createElement("li", "", { class: "project-li" });
        const p = createElement("p", text, { class: "projectTitle" });
        const editBtn = createElement("button", "Edit", { type: "submit", class: "editProject-btn"  })
        const deleteBtn = createElement("button", "Delete", { type: "submit", class: "deleteProject-btn" });
        li.append(p, editBtn, deleteBtn);
        return li;
    } 


    const createTodoForm = () => {
        const form = createElement("form");
        const title = createElement("input", "", { name: "title", class: "title", placeholder: "Title", id: "title"});
        const description = createElement("input", "", { name: "description", class: "description", placeholder: "Description", id: "description" });
        const date = createElement("input", "", { name: "date", class: "date", type: "date", id: "date" });
        const priorities = createElement("select", "", { name: "priorities", id: "priority-select" }, Priority.acceptedLevels);
        const projects = createElement("select", "", { name: "projects", id: "projects-select" }, defaultProject.getProjects().map(projects => projects.getTitle()));
        const submitBtn = createElement("button", "Submit", { type: "button", class: "todo-submit-btn" });
        const cancelBtn = createElement("button", "Cancel", { type: "button", class: "cancel-btn" });
        form.append(title, description, date, priorities, projects, submitBtn, cancelBtn);
        return form;
    }

    const createProjectForm = () => {
        const form = createElement("form");
        const name = createElement("input", "", { type: "text", placeholder: "Enter your projects name..." });
        const submitBtn = createElement("button", "Add", { type: "button", class: "project-submit-btn" });
        const cancelBtn = createElement("button", "Cancel", { type: "button", class: "cancel-btn" });
        const buttonDiv = createElement("div", "", { class: "button-div" });
        buttonDiv.append(submitBtn, cancelBtn);
        form.append(name, buttonDiv);
        return form;
    }

    return { createElement, createProjectForm, createTodoForm, createTodoDivs, createProjectListItem}
})();