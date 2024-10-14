export function createTodo(inputs){

    let completed = false;
    const getCompleted = () => completed;
    const setCompleted = (hasCompleted) => completed = hasCompleted;

    const getInfos = () => inputs;

    return { 
        getCompleted, 
        setCompleted, 
        getInfos,
        isTodoItem : true,
    };
}