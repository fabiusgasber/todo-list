import { domLoader } from "./dom-loader";
import { project } from "./projects";

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
        domLoader.showOnPage(project.getTodos());
    }
}

export class PageToday extends Page {
    navigateTo(){
        domLoader.showOnPage(project.getToday());
    }
}

export class PageWeek extends Page {
    navigateTo(){
        domLoader.showOnPage(project.getWeek());
    }
}

export class PageImportant extends Page {
    navigateTo(){
        domLoader.showOnPage(project.getImportant());
    }
}