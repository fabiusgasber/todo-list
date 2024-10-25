import { domCreator } from "./dom-creator";
import { domLoader } from "./dom-loader";

export class Navigation {
    constructor(page, todoArrFt, projectArr){
        this.page = page;
        this.todoArrFt = todoArrFt;
        this.projectArr = projectArr;
    }

    execute(){
        this.page.navigateTo(this.todoArrFt, this.projectArr);
    }
}

class Page {
    navigateTo(){}
}

export class PageAll extends Page {
    navigateTo(todoArrFt, projectArr){
        if(todoArrFt && projectArr && typeof todoArrFt === "function"){
            const todoArr = todoArrFt();
            const main = domLoader.getQuery("#content");
            main.replaceChildren();
            const todoDivs = domCreator.createTodoDivs(todoArr, projectArr);
            todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));    
        }
    }
}