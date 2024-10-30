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
            const todoText = todo.getText().map(text => createElement("p", text));
            textContent.append(...todoText);
            const date = createElement("p", todo.getDate().toString());
            const priority = createElement("p", todo.getPriority().getLevel());
            const buttonDiv = createElement("div", "", { class: "button-div" });
            const editBtn = createElement("button", "Edit", { type: "submit", class: "editTodo-btn" });
            const deleteBtn = createElement("button", "Delete", { type: "submit", class: "deleteTodo-btn" });
            buttonDiv.append(editBtn, deleteBtn);
            div.append(textContent, date, priority, buttonDiv);
            return div;
        });
        return todoDivs;
    }

    const createProjectListItem = (text) => {
        const li = createElement("li", "", { class: "project-li" });
        const p = createElement("p", text, { class: "projectTitle" });
        const editBtn = createElement("button", "Edit", { type: "submit", class: "editProject-btn"  })
        const deleteBtn = createElement("button", "Delete", { type: "submit", class: "deleteProject-btn" });
        const buttonDiv = createElement("div", "", { class: "button-div" });
        buttonDiv.append(editBtn, deleteBtn);
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