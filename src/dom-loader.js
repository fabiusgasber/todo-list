export const domLoader = (() => {

    const getQuery = (selector, elem = document) => {
        const element = elem.querySelector(selector);
        if(!element) {
            return console.error(`Element not found: ${selector}`);
        }
        return element;
    }

    const appendChildToParent = (child, parent) => {
       return parent.append(child);
    }

    const removeElement = (element) => {
        if(element && typeof element.remove === "function" && typeof element.reset === "function"){
            element.remove();
            element.reset();
        }
        else if (element && typeof element.remove === "function") {
            element.remove();
        }
        else {
            console.warn(`${element} not found or does not contain remove function...`);
        }
    }
    
    return { getQuery, removeElement, appendChildToParent }
})();