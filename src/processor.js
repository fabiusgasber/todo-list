import { DueDate } from "./duedate";
import { Priority } from "./priorities";

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

export const processor = (() => {

    const checkArray = (arr) => {
        return arr && arr.length > 0;
    }

    const parseInput = (inputArr) => {
        if(checkArray(inputArr)){
            return inputArr.map(input => processor[input.type].process(input.value))
        }
        else {
            console.warn(`Inputs empty or in the wrong format ${inputArr}`);
        }
    }
   
    const processor = {
     "text": new TextProcessor(),
     "date": new DateProcessor(),
     "select-one": new PriorityProcessor(),
    }
  
    return { parseInput, checkArray }
 })();