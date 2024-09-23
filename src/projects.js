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
    let dueToday = allTasks.filter(task => isToday(task.getDate()));
    dueToday.forEach(task => today.addTodo(task));
    return today;
}

function sameDay(d1, d2) {
    if(d1 && d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
    }
}
  