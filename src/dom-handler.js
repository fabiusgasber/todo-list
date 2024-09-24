import { getAllTasks } from "./projects";
import { createTodo } from "./todo-items";

function createInput(type, name, id){
    const input = document.createElement("input");
    input.type = type;
    name ? input.name = name : "";
    id ? input.id = id : "";
    return input;
}

function createLabel(labelFor, textContent){
    const label = document.createElement("label");
    label.for = labelFor;
    label.textContent = textContent;
    return label;
}

function createButton(type, textContent) {
    const btn = document.createElement("button");
    type ? btn.type = type : "";
    btn.textContent = textContent;
    return btn;
}

function createTodoContainer(todo){
    const container = document.createElement("div");
    container.classList.add("todo-container");

    const title = document.createElement("h1");
    title.textContent = todo.getTitle();

    const description = document.createElement("p");
    description.textContent = todo.getDescription();

    const dueDate = createInput("date");
    dueDate.value = todo.getDate().toString() ? todo.getDate().toString() : "";

    container.append(title, description, dueDate);

    return container;
}

function createForm(){
    const formIsVisible = document.querySelector("#todo-form")
    if(formIsVisible){
        return;
    }
    else {
        const form = document.createElement("form");
        form.id = "todo-form";
    
        const titleLabel = createLabel("title", "Title");
        const title = createInput("text", "title", "title");
    
        const descriptionLabel = createLabel("description", "Description (optional)");
        const description = createInput("text", "description", "description");

        const dateLabel = createLabel("date", "Due Date");
        const date = createInput("date", "date", "date");
    
        const submitBtn = createButton("button", "Submit");
        submitBtn.addEventListener("click", function() {
            const allTasks = getAllTasks();
            allTasks.addTodo(createTodo(title.value, description.value, date.value));
            removeForm();
            loadProjects(allTasks);
        });
    
        const cancelBtn = createButton("button", "Cancel");    
        cancelBtn.addEventListener("click", removeForm);    
    
        form.append(titleLabel, title, descriptionLabel, description, dateLabel, date, submitBtn, cancelBtn);
        return form;
    }
}

function removeForm(){
    const formIsVisible = document.querySelector("form")
    formIsVisible ? formIsVisible.remove() : console.warn("To do form not found");
}

export function initForm(){
    const contentDiv = document.querySelector("#content");
    const form = createForm();
    contentDiv.append(form);    
}

export function loadProjects(project) {
    const main = document.querySelector("#content");
    main.replaceChildren();
    if (project.getTodos().length > 0) {
    const todoContainers = project.getTodos().map(todo => createTodoContainer(todo));
    todoContainers.forEach(container => main.append(container));
    }
    else {
        return;
    }
}