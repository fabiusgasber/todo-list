import { createTodo } from "./todo-items";
import { createProject, defaultProject } from "./projects";
import { processor } from "./processor";
import { domCreator } from "./dom-creator";

export const domLoader = (() => {

    const getQuery = (selector, elem = document) => {
        const element = elem.querySelector(selector);
        if(!element) {
            return console.error(`Element not found: ${selector}`);
        }
        return element;
    }

    const appendChildToParent = (child, parent) => {
       return parent.append(child);
    }

    const removeElement = (element) => {
        if(element && typeof element.remove === "function" && typeof element.reset === "function"){
            element.remove();
            element.reset();
        }
        else if (element && typeof element.remove === "function") {
            element.remove();
        }
        else {
            console.warn(`${element} not found or does not contain remove function...`);
        }
    }

    const showOnPage = (project) => {
        const main = getQuery("#content");
        main.replaceChildren();
        project.forEach(todo => {
            const div = document.createElement("div");
            const text = todo.getText().map(text => domCreator.createElement("div", text));
            const date = domCreator.createElement("div", todo.getDate().toString());
            const priority = domCreator.createElement("div", todo.getPriority().getLevel());
            const editBtn = domCreator.createElement("button", "Edit", { type: "submit" })
            const deleteBtn = domCreator.createElement("button", "Delete", { type: "submit" })
            div.append(...text, date, priority, editBtn, deleteBtn);
            main.append(div);
        });
    }
    
    const submitProject = (form) => {
        const ul = getQuery("#ownProjects")
        const textInput = Array.from(form.children).find(element => element.tagName === "INPUT");
        const userProject = createProject(textInput.value);
        const li = domCreator.createElement("li", userProject.getTitle());
        li.addEventListener("click", () => showOnPage(userProject.getTodos()));
        appendChildToParent(li, ul);
    }
    
    const submitForm = (form) => {
        let inputArr = [];
        let parsedInputs = [];
        if(form && processor.checkArray(form.children)){
            inputArr = Array.from(form.children).filter(element => element.tagName === "SELECT" || element.tagName === "INPUT").map(input => ({ type: input.type, value: input.value }));
        }
        if(processor.checkArray(inputArr)){
            parsedInputs = processor.parseInput(inputArr);
        }
        if(processor.checkArray(parsedInputs)){
            defaultProject.allTasks.addTodo(createTodo(parsedInputs));
        }
    }
    
    return { getQuery, removeElement, appendChildToParent, submitForm, showOnPage, submitProject }
})();