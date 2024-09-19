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
