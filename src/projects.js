export function createProject(title) {

    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;

    let todoItems = [];
    const getTodos = () => todoItems;
    const addTodo = (todo) => todo.isTodoItem ? todoItems.push(todo) : console.warn("Invalid todo item");
    const removeTodo = (todo) => {
        const index = todoItems.indexOf(todo);
        index !== -1 ? todoItems.splice(index, 1) : console.warn("To do item was not found");
    }
    
    return { getTitle, setTitle, getTodos, addTodo, removeTodo }
}
export function loadToday(){
    let today = createProject("Today");
    const allTasks = getAllTasks().getTodos();
    let dueToday = allTasks.filter(task => task.getDate().isDueToday());
    dueToday.forEach(task => today.addTodo(task));
    return today;
}


export function loadWeek(){
    let nextWeek = createProject("Next Week");
    const allTasks = getAllTasks().getTodos();
    let dueNextWeek = allTasks.filter(task => task.getDate().isDueNextWeek());
    dueNextWeek.forEach(task => nextWeek.addTodo(task));
    return nextWeek;
}