import { DueDate } from "./duedate";
import { Priority } from "./priorities";

export function createTodo(title){

    let completed = false;
    let project = null;
    let todoTitle = title;

    const getCompleted = () => completed;
    const setCompleted = (hasCompleted) => completed = hasCompleted;

    const getTitle = () => todoTitle;
    const setTitle = (newTitle) => todoTitle = newTitle;

    const getProject = () => project;
    const setProject = (newProject) => {
        if (newProject && typeof newProject.addTodo === "function") {
            project = newProject;
            project.addTodo(todo);
        }
    }

    const dueDate = new DueDate("");
    const getDate = () => dueDate;

    const priority = new Priority();
    const getPriority = () => priority;

    const todo = { 
        getCompleted, 
        setCompleted,
        getTitle,
        setTitle,
        getDate,
        getPriority,
        getProject,
        setProject,
        uuID: Math.floor(Math.random() * 100000),
        isTodoItem : true,
    };

    return todo;
}