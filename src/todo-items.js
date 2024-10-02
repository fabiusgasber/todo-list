import { DueDate } from "./duedate";
import { Priority } from "./priorities";

export function createTodo(title = "", description = "", dueDate = null, priority = "medium"){

    let completed = false;

    const getCompleted = () => completed;
    const setCompleted = (hasCompleted) => completed = hasCompleted;

    priority = new Priority(priority);
    const getPriority = () => priority;

    dueDate = new DueDate(dueDate);
    const getDate = () => dueDate;

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
        getCompleted, 
        setCompleted, 
        getPriority, 
        isTodoItem : true,
    };
}