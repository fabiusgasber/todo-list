import { DueDate } from "./duedate";
import { Priority } from "./priorities";

export function createTodo(inputs){

    let completed = false;
    const getCompleted = () => completed;
    const setCompleted = (hasCompleted) => completed = hasCompleted;

    const getInfo = (className) => {
        if(className && typeof className.prototype === "object"){
           return inputs.find(input => input instanceof className);
        }
        else {
          return console.warn(`Invalid class name ${className}`);
        }
    }

    const getProject = () => inputs.find(input => input.isProject === true);

    const getText = () => inputs.filter(input => typeof input === 'string' || input instanceof String);

    const getDate = () => getInfo(DueDate);

    const getPriority = () => getInfo(Priority);

    return { 
        getCompleted, 
        setCompleted,
        getText,
        getDate,
        getPriority,
        getProject,
        isTodoItem : true,
    };
}