import { domCreator } from "./dom-creator";
import { domLoader } from "./dom-loader";
import { createProject, defaultProject } from "./projects";
import { userStorage } from "./user-storage";
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
        if(form && form.children && button.id === "addProject"){
            const ul = domLoader.getQuery("#projects");
            const textInput = Array.from(form.children).find(element => element.tagName === "INPUT");
            const userProject = createProject(textInput.value);
            defaultProject.addProject(userProject);
            let storedData = userStorage.getData("projects");
            storedData.push({title: userProject.getTitle(), todos: userProject.getTodos(), projectID: userProject.getUUID()});
            userStorage.addData("projects", storedData);
            const li = domCreator.createProjectListItem(userProject.getTitle(), userProject);
            domLoader.appendChildToParent(li, ul);
            li.click();
        }
        else if (form && form.children && button.id === "addTodo") {
            const textInput = Array.from(form.children).find(element => element.tagName === "INPUT");
            const todo = createTodo(textInput.value);
            const projectTitle = domLoader.getQuery("#page-title");
            const projectID = projectTitle.getAttribute("projectid");
            const project = defaultProject.getProjects().find(project => project.getUUID() == projectID);
            if (project){
                todo.setProject(project)
                defaultProject.allTasks.addTodo(todo);
                const nav = document.querySelector("#projects");
                const li = Array.from(nav.children).find(project => project.getAttribute("projectid") == projectID);
                li.click();
                let storedData = userStorage.getData("projects");
                const storedProject = storedData.find(data => data.projectID == li.getAttribute("projectid"));
                const storedDefault = storedData.find(data => data.title == "default");
                storedDefault.todos.push(...project.getTodos().map(todo => ({title: todo.getTitle(), completed: todo.getCompleted(), date: todo.getDate().toString(), priority: todo.getPriority().getLevel(), todoID: todo.getUUID()})));
                storedProject.todos.push(...project.getTodos().map(todo => ({title: todo.getTitle(), completed: todo.getCompleted(), date: todo.getDate().toString(), priority: todo.getPriority().getLevel(), todoID: todo.getUUID()})));
                userStorage.addData("projects", storedData);
            }
            else {
               todo.setProject(defaultProject.allTasks);
               let storedData = userStorage.getData("projects");
               let storedDefault = storedData.find(data => data.title == "default");
               storedDefault.todos.push(...defaultProject.allTasks.getTodos().map(todo => ({title: todo.getTitle(), completed: todo.getCompleted(), date: todo.getDate().toString(), priority: todo.getPriority().getLevel(), todoID: todo.getUUID()})));
               userStorage.addData("projects", storedData);
               domLoader.getQuery("#all").click();
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
        let storedData = userStorage.getData("projects");
        let storedProject = storedData.find(data => data.projectID === userProject.uuID);
        storedData.splice(storedData.indexOf(storedProject), 1);
        userStorage.addData("projects", storedData);
        defaultProject.removeProject(userProject);
        domLoader.removeElement(projectItem);
       }
    }
}

export class TodoDeleteAction extends Action {
    handleEvent(e){
        const todoDiv = e.target.closest(".todoDiv");
        const todoID = todoDiv.getAttribute("todoID");
        const storedData = userStorage.getData("projects");
        defaultProject.getProjects().forEach(project => project.getTodos().forEach(todo => {
           if(todo.getUUID() == todoID){
            project.removeTodo(todo);
           };
        }));
        storedData.forEach(project => project.todos.forEach((todo, index) => {
            if(todo.todoID == todoID){
                project.todos.splice(index, 1);
               };
        }));
        userStorage.addData("projects", storedData);
        domLoader.removeElement(todoDiv);
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
        const project = defaultProject.getProjects().find(projectItem => projectItem.getUUID() == projectID);
        const todo = project.getTodos().find(todoItem => todoItem.getUUID() == todoID);
        let storedData = userStorage.getData("projects");
        let storedProject = storedData.find(data => data.projectID == projectID);
        let storedDefaultProject = storedData.find(data => data.title == "default");
        let storedTodo = storedProject.todos.find(data => data.todoID == todoID);
        let storedDefaultTodo = storedDefaultProject.todos.find(data => data.todoID == todoID);
        if (e.target.className && e.target.classList.contains("priority-select")) {
            todo.getPriority().setLevel(e.target.value);
            storedTodo.priority = todo.getPriority().getLevel();
            storedDefaultTodo.priority = todo.getPriority().getLevel();
        }
        else if(e.target.tagName === "INPUT" && e.target.getAttribute("type") === "date"){
            todo.getDate().setDate(e.target.value);
            storedTodo.date = todo.getDate().toString();
            storedDefaultTodo.date = todo.getDate().toString();
        }
        userStorage.addData("projects", storedData);
    }
}

export class ChangeTextAction extends Action {
    handleEvent(e){
        if(e.target.classList.contains("todo-text")){
            const container = e.target.closest(".todoDiv");
            const todoID = container.getAttribute("todoid");
            const projectID = container.getAttribute("projectid");
            const project = defaultProject.getProjects().find(projectItem => projectItem.getUUID() == projectID);
            const todo = project.getTodos().find(todoItem => todoItem.getUUID() == todoID);
            const textContainer = e.target;
            const textInput = domCreator.createElement("input", "", { value: e.target.textContent });
            let storedData = userStorage.getData("projects");
            let storedProject = storedData.find(data => data.projectID == projectID);
            let storedTodo = storedProject.todos.find(data => data.todoID == todoID);   
            let storedDefaultProject = storedData.find(data => data.title == "default");
            let storedDefaultTodo = storedDefaultProject.todos.find(data => data.todoID == todoID); 
            textInput.addEventListener("focusout", (e) => {
                todo.setTitle(e.target.value);
                textContainer.replaceChildren();
                textContainer.textContent = e.target.value;
                storedTodo.title = todo.getTitle();
                storedDefaultTodo.title = todo.getTitle();
                userStorage.addData("projects", storedData);
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
       e.target.closest(".todoDiv").classList.toggle("done");
    }
}