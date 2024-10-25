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
            }
    
        }
        domLoader.removeElement(form);
    }
}

export class ProjectSubmitAction extends Action {
    handleEvent(e){
        const form = e.target.form;
        if(form && processor.checkArray(form.children)){
            const main = domLoader.getQuery("#content");
            const ul = domLoader.getQuery("#ownProjects");
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
        domLoader.removeElement(form);
    }
}

export class FormCancelAction extends Action {
    handleEvent(e){
        if(e && e.target.form){
            domLoader.removeElement(e.target.form);
        }
    }
}

export class ProjectDeleteAction extends Action {
    handleEvent(e){
       const projectTitle = Array.from(e.target.parentElement.children).find(element => element.className === "projectTitle");
       if(projectTitle && typeof projectTitle.textContent === "string" || projectTitle.textContent instanceof String){
        const userProject = defaultProject.getProjects().find(project => project.getTitle() === projectTitle.textContent);
        defaultProject.removeProject(userProject);
        domLoader.removeElement(e.target.parentElement);
       }
    }
}

export class TodoDeleteAction extends Action {
    handleEvent(e){
        const projectID = e.target.parentElement.getAttribute("projectID");
        const todoID = e.target.parentElement.getAttribute("todoID");
        const project = defaultProject.getProjects().find(project => project.uuID == projectID);
        const todo = project.getTodos().find(todo => todo.uuID == todoID);
        if(todo && project){
            project.removeTodo(todo);
            domLoader.removeElement(e.target.parentElement);
        }
    }
}

export class AddTodoAction extends Action {
    handleEvent(){
        const main = domLoader.getQuery("#content");
        const todoForm = domCreator.createTodoForm();
        todoForm.id = "todo-form";
        domLoader.appendChildToParent(todoForm, main);
    }
}

export class AddProjectAction extends Action {
    handleEvent(){
        const projectList = domLoader.getQuery("#ownProjects");
        const projectForm = domCreator.createProjectForm();
        domLoader.appendChildToParent(projectForm, projectList);
    }
}