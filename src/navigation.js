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
        console.log(project.getTodos());
    }
}

export class PageToday extends Page {
    navigateTo(){
        console.log(project.getToday());
    }
}

export class PageWeek extends Page {
    navigateTo(){
        console.log(project.getWeek());
    }
}

export class PageImportant extends Page {
    navigateTo(){
        console.log(project.getImportant());
    }
}