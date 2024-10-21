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
    handleEvent(e, options){
        const form = e.target.parentElement;
        if(options["submitForm"] && form.id === "todo-form"){
            options["submitForm"](form);
        }
        if(options["submitProject"] && form.id !== "todo-form"){
            options["submitProject"](form);
        }
        options["cancelFtn"](form);
    }
}

export class FormCancelAction extends Action {
    handleEvent(e, options){
        const form = e.target.parentElement;
        options["cancelFtn"](form);
    }
}

export class ProjectDeleteAction extends Action {
    handleEvent(e, options){
       const defaultProject = options["defaultProject"];
       const projectTitle = Array.from(e.target.parentElement.children).find(element => element.id === "projectTitle");
       const userProject = defaultProject.getProjects().find(project => project.getTitle() === projectTitle.textContent);
       defaultProject.removeProject(userProject);
       options["cancelFtn"](e.target.parentElement);
    }
}

export class TodoDeleteAction extends Action {
    handleEvent(e, options){
        const defProject = options["defaultProject"];
        const projectID = e.target.parentElement.getAttribute("projectID");
        const todoID = e.target.parentElement.getAttribute("todoID");
        const project = defProject.getProjects().find(project => project.uuID == projectID);
        const todo = project.getTodos().find(todo => todo.uuID == todoID);
        if(todo && project){
            project.removeTodo(todo);
            options["cancelFtn"](e.target.parentElement);
        }
    }
}