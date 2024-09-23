import { Priority } from "./priorities";
import { format } from "date-fns";

export function createTodo(title = "", description = "", dueDate = null){

    let completed = false;
    const getCompleted = () => completed;
    const setCompleted = (hasCompleted) => completed = hasCompleted;

    let priority = new Priority("medium");
    const getPriority = () => priority.getLevel();
    const setPriority = (level) => priority.setLevel(level);

    const getDate = () => dueDate;
    const setDate = (date) => dueDate = new Date(date);
    const getFormattedDate = () => isNaN(dueDate.getTime()) ? "" : format(dueDate, "yyyy-MM-dd");

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
        getFormattedDate,
        setDate, 
        getCompleted, 
        setCompleted, 
        getPriority, 
        setPriority,
        isTodoItem : true,
    };
}