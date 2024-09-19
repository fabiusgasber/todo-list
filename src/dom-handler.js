export function createInput(type, name, id){
    const input = document.createElement("input");
    input.type = type;
    name ? input.name = name : "";
    id ? input.id = id : "";
    return input;
}

export function createLabel(labelFor, textContent){
    const label = document.createElement("label");
    label.for = labelFor;
    label.textContent = textContent;
    return label;
}

export function createButton(type, textContent) {
    const btn = document.createElement("button");
    type ? btn.type = type : "";
    btn.textContent = textContent;
    return btn;
}

export function createTodoContainer(todo){
    const container = document.createElement("div");
    container.classList.add("todo-container");

    const title = document.createElement("h1");
    title.textContent = todo.getTitle();

    const description = document.createElement("p");
    description.textContent = todo.getDescription();

    const dueDate = createInput("date");
    dueDate.value = todo.getDate().toISOString().split('T')[0];

    container.append(title, description, dueDate);

    return container;
}

