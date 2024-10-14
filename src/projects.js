import { DueDate } from "./duedate";
import { Priority } from "./priorities";

export const project = (function (title) {

    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;

    let todoItems = [];
    const getTodos = () => todoItems;
    const addTodo = (todo) => todo.isTodoItem ? todoItems.push(todo) : console.warn("Invalid todo item");
    const removeTodo = (todo) => {
        const index = todoItems.indexOf(todo);
        index !== -1 ? todoItems.splice(index, 1) : console.warn("To do item was not found");
    }

    const getToday = () => todoItems.filter(task => task.getInfo(DueDate)?.isDueToday());

    const getWeek = () => todoItems.filter(task => task.getInfo(DueDate)?.isDueNextWeek());

    const getImportant = () => todoItems.filter(task => task.getInfo(Priority)?.getLevel() === "high");
    
    return { getTitle, setTitle, getTodos, addTodo, removeTodo, getToday, getWeek, getImportant }
})();