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

    const parseInput = (inputArr) => {
      return inputArr.map(input => processor[input.type].process(input.value))
    }
   
    const processor = {
     "text": new TextProcessor(),
     "date": new DateProcessor(),
     "select-one": new PriorityProcessor(),
    }
  
    return { parseInput }
 })();