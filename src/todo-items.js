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

    return { 
        getCompleted, 
        setCompleted,
        getInfo,
        isTodoItem : true,
    };
}