export function createInput(type, name, id){
    const input = document.createElement("input");
    input.type = type;
    name ? input.name = name : "";
    id ? input.id = id : "";
    return input;
}

