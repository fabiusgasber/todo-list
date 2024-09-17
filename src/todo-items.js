import { Priority } from "./priorities";

export function createTodo(title = "", description = "", dueDate = null){

    let completed = false;
    const getCompleted = () => completed;
    const setCompleted = (hasCompleted) => completed = hasCompleted;

    let priority = new Priority("medium");
    const getPriority = () => priority.getLevel();
    const setPriority = (level) => priority.setLevel(level);

    const getDate = () => dueDate;
    const setDate = (date) => dueDate = new Date(date);

    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;

    const getDescription = () => description;
    const setDescription = (newDescription) => description = newDescription;

    return { 
        getTitle, 
        setTitle, 
        getDescription, 
        setDescription, 
        getDate, 
        setDate, 
        getCompleted, 
        setCompleted, 
        getPriority, 
        setPriority,
        isTodoItem : true,
    };
}