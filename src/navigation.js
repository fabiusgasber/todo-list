import { domCreator } from "./dom-creator";
import { domLoader } from "./dom-loader";
import { defaultProject } from "./projects";

export class Navigation {
    constructor(page){
        this.page = page;
    }

    execute(){
        this.page.navigateTo();
    }
}

class Page {
    navigateTo(){}
}

export class PageAll extends Page {
    navigateTo(){
        const main = domLoader.getQuery("#content");
        main.replaceChildren();
        const todoDivs = domCreator.createTodoDivs(defaultProject.allTasks.getTodos(), defaultProject.allTasks)
        todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));
    }
}

export class PageToday extends Page {
    navigateTo(){
        const main = domLoader.getQuery("#content");
        main.replaceChildren();
        const todoDivs = domCreator.createTodoDivs(defaultProject.getToday(), defaultProject.allTasks)
        todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));
    }
}

export class PageWeek extends Page {
    navigateTo(){
        const main = domLoader.getQuery("#content");
        main.replaceChildren();
        const todoDivs = domCreator.createTodoDivs(defaultProject.getWeek(), defaultProject.allTasks)
        todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));
    }
}

export class PageImportant extends Page {
    navigateTo(){
        const main = domLoader.getQuery("#content");
        main.replaceChildren();
        const todoDivs = domCreator.createTodoDivs(defaultProject.getImportant(), defaultProject.allTasks)
        todoDivs.forEach(todoDiv => domLoader.appendChildToParent(todoDiv, main));

    }
}