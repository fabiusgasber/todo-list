import { domCreator } from "./dom-creator";
import { domLoader } from "./dom-loader";
import { Navigation, PageAll } from "./navigation";
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

export class TodoSubmitAction extends Action {
    handleEvent(e){
        const form = e.target.form;
        if(form && processor.checkArray(form.children)){
            let inputArr = [];
            let parsedInputs = [];
            if(form && processor.checkArray(form.children)){
                inputArr = Array.from(form.children).filter(element => element.tagName === "SELECT" || element.tagName === "INPUT").map(input => ({ type: input.type, value: input.value, id: input.id }));
            }
            if(processor.checkArray(inputArr)){
                parsedInputs = processor.parseInput(inputArr);
            }
            if(processor.checkArray(parsedInputs)){
                const todo = createTodo(parsedInputs);
                defaultProject.allTasks.addTodo(todo);
                if (todo.getProject() && todo.getProject() !== defaultProject.allTasks){
                    todo.getProject().addTodo(todo);
                }
                new Navigation(new PageAll(), todo.getProject().getTodos, todo.getProject()).execute();
            }
    
        }
        new FormCancelAction().handleEvent(e);
    }
}

export class ProjectSubmitAction extends Action {
    handleEvent(e){
        const form = e.target.form;
        if(form && processor.checkArray(form.children)){
            const main = domLoader.getQuery("#main");
            const ul = domLoader.getQuery("#projects");
            const textInput = Array.from(form.children).find(element => element.tagName === "INPUT");
            const userProject = createProject(textInput.value);
            defaultProject.addProject(userProject);
            const li = domCreator.createProjectListItem(userProject.getTitle());
            li.addEventListener("click", () => {
                main.replaceChildren();
                const todoDivs = domCreator.createTodoDivs(userProject.getTodos(), userProject);
                todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));
            });
            domLoader.appendChildToParent(li, ul);
    
        }
        new FormCancelAction().handleEvent(e);
    }
}

export class FormCancelAction extends Action {
    handleEvent(e){
        if(e && e.target.form){
            domLoader.removeElement(e.target.form);
            domLoader.getQuery("#addTodo").style.display = "block";
            domLoader.getQuery("#addProject").style.display = "block";
        }
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
            project.removeTodo(todo);
            domLoader.removeElement(todoDiv);
        }
    }
}

export class AddItemAction extends Action {
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