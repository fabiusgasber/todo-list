import { DueDate } from "./duedate";
import { Priority } from "./priorities";

export function createTodo(title = "", description = "", dueDate = null){

    let completed = false;

    const getCompleted = () => completed;
    const setCompleted = (hasCompleted) => completed = hasCompleted;

    let priority = new Priority("medium");
    const getPriority = () => priority.getLevel();
    const setPriority = (level) => priority.setLevel(level);

    dueDate = new DueDate(dueDate);
    const getDate = () => dueDate.getDate();
    const setDate = (date) => dueDate.setDate(date);
    const getFormattedDate = () => dueDate.toString()

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