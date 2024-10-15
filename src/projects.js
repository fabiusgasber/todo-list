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

    const getInfo = (arr) => {
        return arr.map(todoItem => {
            return ({"text": todoItem.getText(), "date": todoItem.getDate().toString(), "priority": todoItem.getPriority().getLevel()});
        });
    }

    const toString = (arr) => {
        return getInfo(arr).map(object => Object.values(object));
    }

    const getToday = () => todoItems.filter(task => task.getDate()?.isDueToday());

    const getWeek = () => todoItems.filter(task => task.getDate()?.isDueNextWeek());

    const getImportant = () => todoItems.filter(task => task.getPriority()?.getLevel() === "high");
    
    return { getTitle, setTitle, getTodos, addTodo, removeTodo, getToday, getWeek, getImportant, toString }
})();