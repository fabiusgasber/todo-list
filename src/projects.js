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
};

export const defaultProject = (function defaultProject () {
    const allTasks = createProject("default");

    const projectArr = [allTasks];

    const getProjects = () => projectArr.map(project => project.getTitle());
    const addProject = (project) => projectArr.push(project); 

    const getToday = () => allTasks.getTodos().filter(task => task.getDate()?.isDueToday());

    const getWeek = () => allTasks.getTodos().filter(task => task.getDate()?.isDueNextWeek());

    const getImportant = () => allTasks.getTodos().filter(task => task.getPriority()?.getLevel() === "high");

    return { allTasks, getToday, getWeek, getImportant, getProjects, addProject };
})();