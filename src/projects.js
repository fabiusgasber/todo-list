export function createProject(title) {

    let uuID = Math.floor(Math.random() * 100000);

    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;

    let todoItems = [];
    const getTodos = () => todoItems;
    const addTodo = (todo) => todo.isTodoItem ? todoItems.push(todo) : console.warn("Invalid todo item");
    const removeTodo = (todo) => {
        const index = todoItems.indexOf(todo);
        index !== -1 ? todoItems.splice(index, 1) : console.warn("To do item was not found");
    }

    const getToday = () => todoItems.filter(task => task.getDate()?.isDueToday());

    const getWeek = () => todoItems.filter(task => task.getDate()?.isDueNextWeek());

    const getImportant = () => todoItems.filter(task => task.getPriority()?.getLevel() === "high");

    const getUUID = () => uuID;
    const setUUID = (newUUID) => uuID = newUUID; 
    
    return { getTitle, setTitle, getTodos, addTodo, removeTodo, getToday, getWeek, getImportant, isProject: true, getUUID, setUUID};
};

export const defaultProject = (function defaultProject () {
    const allTasks = createProject("default");

    const projectArr = [allTasks];

    const getProjects = () => projectArr;
    const addProject = (project) => projectArr.push(project); 
    const removeProject = (project) => {
        const index = projectArr.indexOf(project);
        index !== -1 ? projectArr.splice(index, 1) : console.warn(`Project not found ${project}`);
    }

    return { allTasks, getProjects, addProject, removeProject };
})();