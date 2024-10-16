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
        domLoader.showOnPage(defaultProject.allTasks.getTodos());
    }
}

export class PageToday extends Page {
    navigateTo(){
        domLoader.showOnPage(defaultProject.getToday());
    }
}

export class PageWeek extends Page {
    navigateTo(){
        domLoader.showOnPage(defaultProject.getWeek());
    }
}

export class PageImportant extends Page {
    navigateTo(){
        domLoader.showOnPage(defaultProject.getImportant());
    }
}