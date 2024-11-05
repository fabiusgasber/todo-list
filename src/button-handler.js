import { domCreator } from "./dom-creator";
import { domLoader } from "./dom-loader";
import { processor } from "./processor";
import { createProject, defaultProject } from "./projects";
import { createTodo } from "./todo-items";

export class ButtonHandler {
    constructor(action){
        this.action = action;
    }

    execute(e, options){
        this.action.handleEvent(e, options);
    }
}

class Action {
    handleEvent(){};
}

export class FormSubmitAction extends Action {
    handleEvent(e){
        const form = e.target.form;
        const container = e.target.closest(".add-item");
        const button = Array.from(container.children).find(button => button.classList.contains("add-btn"));
        if(form && processor.checkArray(form.children) && button.id === "addProject"){
            const ul = domLoader.getQuery("#projects");
            const textInput = Array.from(form.children).find(element => element.tagName === "INPUT");
            const userProject = createProject(textInput.value);
            defaultProject.addProject(userProject);
            const li = domCreator.createProjectListItem(userProject.getTitle(), userProject);
            domLoader.appendChildToParent(li, ul);
        }
        else if (form && processor.checkArray(form.children) && button.id === "addTodo") {
            const textInput = Array.from(form.children).find(element => element.tagName === "INPUT");
            const todo = createTodo(textInput.value);
            const projectTitle = domLoader.getQuery("#page-title");
            const projectID = projectTitle.getAttribute("projectid");
            const project = defaultProject.getProjects().find(project => project.uuID == projectID);
            if (project){
                todo.setProject(project)
                defaultProject.allTasks.addTodo(todo);
            }
            else {
               todo.setProject(defaultProject.allTasks);
            }
        }
        new FormCancelAction().handleEvent(e);
    }
}

export class ProjectDeleteAction extends Action {
    handleEvent(e){
       const projectItem = e.target.closest(".project-li");
       const projectTitle = Array.from(projectItem.children).find(element => element.className === "projectTitle");
       if(projectTitle && typeof projectTitle.textContent === "string" || projectTitle.textContent instanceof String){
        const userProject = defaultProject.getProjects().find(project => project.getTitle() === projectTitle.textContent);
        defaultProject.removeProject(userProject);
        domLoader.removeElement(projectItem);
       }
    }
}

export class TodoDeleteAction extends Action {
    handleEvent(e){
        const todoDiv = e.target.closest(".todoDiv");
        const projectID = todoDiv.getAttribute("projectID");
        const todoID = todoDiv.getAttribute("todoID");
        const project = defaultProject.getProjects().find(project => project.uuID == projectID);
        const todo = project.getTodos().find(todo => todo.uuID == todoID);
        if(todo && project){
            defaultProject.allTasks.removeTodo(todo);
            project.removeTodo(todo);
            domLoader.removeElement(todoDiv);
        }
    }
}

export class FormAddAction extends Action {
    handleEvent(e){
        e.target.closest(".add-btn").classList.add("inactive");
        const container = e.target.closest(".add-item");
        let form = domLoader.getQuery("form");
        if(form) {
            Array.from(document.querySelectorAll(".add-btn")).filter(button => button !== e.target.closest(".add-btn")).forEach(button => button.classList.remove("inactive"));
        }
        else {
          form = domCreator.createForm();
        }
        domLoader.appendChildToParent(form, container);
    }
}

export class FormCancelAction extends Action {
    handleEvent(e){
        if(e && e.target.form){
            domLoader.removeElement(e.target.form);
            document.querySelectorAll(".add-btn").forEach(button => button.classList.remove("inactive"));
        }
    }
}

export class ChangeItemAction extends Action {
    handleEvent(e){
        const container = e.target.closest(".todoDiv");
        const todoID = container.getAttribute("todoid");
        const projectID = container.getAttribute("projectid");
        const project = defaultProject.getProjects().find(projectItem => projectItem.uuID == projectID);
        const todo = project.getTodos().find(todoItem => todoItem.uuID == todoID);
        if (e.target.className && e.target.classList.contains("priority-select")) {
            todo.getPriority().setLevel(e.target.value);
        }
        else if(e.target.tagName === "INPUT" && e.target.getAttribute("type") === "date"){
            todo.getDate().setDate(e.target.value);
        }
    }
}

export class ChangeTextAction extends Action {
    handleEvent(e){
        if(e.target.classList.contains("todo-text")){
            const container = e.target.closest(".todoDiv");
            const todoID = container.getAttribute("todoid");
            const projectID = container.getAttribute("projectid");
            const project = defaultProject.getProjects().find(projectItem => projectItem.uuID == projectID);
            const todo = project.getTodos().find(todoItem => todoItem.uuID == todoID);
            const textContainer = e.target;
            const textInput = domCreator.createElement("input", "", { value: e.target.textContent });
            textInput.addEventListener("focusout", (e) => {
                todo.setTitle(e.target.value);
                textContainer.replaceChildren();
                textContainer.textContent = e.target.value;
           });
            textContainer.replaceChildren(textInput);
        }
    }
}

export class TodoCompleteAction extends Action {
    handleEvent(e){
       e.target.classList.toggle("checked");
       e.target.nextSibling.classList.toggle("line-through");
       e.target.nextSibling.classList.toggle("faded");
    }
}