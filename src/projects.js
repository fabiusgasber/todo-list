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

    const loadToday = () => getTodos().filter(task => task.getDate().isDueToday());

    const loadWeek = () => getTodos().filter(task => task.getDate().isDueNextWeek());
    
    return { getTitle, setTitle, getTodos, addTodo, removeTodo, loadToday, loadWeek }
})();