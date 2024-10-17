import { DueDate } from "./duedate";
import { Priority } from "./priorities";
import { defaultProject } from "./projects";

class Processor {
    constructor(value){
        this.value = value;
    }

    process(value){
        this.value.process(value);
    }
}

export class TextProcessor extends Processor {
    process(value){
        return value;
    }
}

export class DateProcessor extends Processor {
    process(value){
        return new DueDate(value);
    }
}

export class PriorityProcessor extends Processor {
    process(value){
        return new Priority(value);
    }
}

export class ProjectProcessor extends Processor {
    process(value){
       const chosenProject = defaultProject.getProjects().find(project => project.getTitle() === value);
       return chosenProject;
    }
}

export const processor = (() => {

    const checkArray = (arr) => {
        return arr && arr.length > 0;
    }

    const parseInput = (inputArr) => {
        if(checkArray(inputArr)){
            return inputArr.map(input => processor[input.id].process(input.value))
        }
        else {
            console.warn(`Inputs empty or in the wrong format ${inputArr}`);
        }
    }
   
    const processor = {
     "title": new TextProcessor(),
     "description": new TextProcessor(),
     "date": new DateProcessor(),
     "priority-select": new PriorityProcessor(),
     "projects-select": new ProjectProcessor(),
    }
  
    return { parseInput, checkArray }
 })();